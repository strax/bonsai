import { Ap, Kind1 } from "@bonsai/kinds"
import { ApplicativeInstance, ApplicativeOps, ApplicativeSyntax } from "./Applicative"
import { id } from "./utils"

export interface MonadInstance<M extends Kind1> extends ApplicativeInstance<M> {
  [Monad.flatMap]<A, B>(ma: Ap<M, A>, f: (a: A) => Ap<M, B>): Ap<M, B>
}

export function Monad<F extends Kind1>(from: Monad<F>): MonadOps<F> {
  if (Monad.flatMap in from) {
    return new (MonadOps(from as MonadInstance<F>))()
  } else {
    return from as MonadOps<F>
  }
}

export abstract class MonadSyntax<M extends Kind1> extends ApplicativeSyntax<M> {
  private monad: MonadOps<M>

  constructor(M: Monad<M>) {
    super(M)
    this.monad = Monad(M)
  }

  flatMap<A, B>(this: Ap<M, A>, f: (a: A) => Ap<M, B>): Ap<M, B> {
    return ((this as unknown) as MonadSyntax<M>).monad.flatMap(this, f)
  }

  flatten<A>(this: Ap<M, Ap<M, A>>): Ap<M, A> {
    return flatten(((this as unknown) as MonadSyntax<M>).monad, (this as unknown) as Ap<M, Ap<M, A>>)
  }
}

export namespace Monad {
  export const flatMap = Symbol("Monad.flatMap")
}

interface MonadOps<M extends Kind1> extends ApplicativeOps<M> {
  flatMap<A, B>(ma: Ap<M, A>, f: (a: A) => Ap<M, B>): Ap<M, B>
}

export function MonadOps<M extends Kind1>(M: MonadInstance<M>) {
  return class extends ApplicativeOps(M) implements MonadOps<M> {
    flatMap = M[Monad.flatMap]

    flatten<A>(mma: Ap<M, Ap<M, A>>): Ap<M, A> {
      return this.flatMap(mma, id)
    }
  }
}

export type Monad<M extends Kind1> = MonadInstance<M> | MonadOps<M>

export function flatMap<M extends Kind1, A, B>(M: Monad<M>, ma: Ap<M, A>, f: (a: A) => Ap<M, B>) {
  return Monad(M).flatMap(ma, f)
}

export const chain = flatMap

export function flatten<M extends Kind1, A>(M: Monad<M>, ma: Ap<M, Ap<M, A>>): Ap<M, A> {
  return Monad(M).flatMap(ma, x => x)
}

export function composeK<M extends Kind1, A, B, C>(M: Monad<M>, f: (b: B) => Ap<M, C>, g: (a: A) => Ap<M, B>) {
  return (a: A) => Monad(M).flatMap(g(a), f)
}
