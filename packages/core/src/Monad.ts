import { Fix, Kind1 } from "@bonsai/kinds"
import { ApplicativeInstance, ApplicativeOps, ApplicativeSyntax } from "./Applicative"
import { id } from "./utils"

export interface MonadInstance<M extends Kind1> extends ApplicativeInstance<M> {
  [Monad.flatMap]<A, B>(ma: Fix<M, A>, f: (a: A) => Fix<M, B>): Fix<M, B>
}

export function Monad<F extends Kind1>(from: Monad<F>): MonadOps<F> {
  if (Monad.flatMap in from) {
    return new (MonadOps(from as MonadInstance<F>))()
  } else {
    return from as MonadOps<F>
  }
}

export abstract class MonadSyntax<K extends Kind1> extends ApplicativeSyntax<K> {
  private monad: MonadOps<K>

  constructor(M: Monad<K>) {
    super(M)
    this.monad = Monad(M)
  }

  flatMap<M extends K, A, B>(this: Fix<M, A>, f: (a: A) => Fix<M, B>): Fix<M, B> {
    return (this as MonadSyntax<M>).monad.flatMap(this, f)
  }

  flatten<M extends K, A>(this: Fix<K, Fix<M, A>>): Fix<M, A> {
    return flatten((this as MonadSyntax<M>).monad, (this as unknown) as Fix<M, Fix<M, A>>)
  }
}

export namespace Monad {
  export const flatMap = Symbol("Monad.flatMap")
}

interface MonadOps<M extends Kind1> extends ApplicativeOps<M> {
  flatMap<A, B>(ma: Fix<M, A>, f: (a: A) => Fix<M, B>): Fix<M, B>
}

export function MonadOps<M extends Kind1>(M: MonadInstance<M>) {
  return class extends ApplicativeOps(M) implements MonadOps<M> {
    flatMap = M[Monad.flatMap]

    flatten<A>(mma: Fix<M, Fix<M, A>>): Fix<M, A> {
      return this.flatMap(mma, id)
    }
  }
}

export type Monad<M extends Kind1> = MonadInstance<M> | MonadOps<M>

export function flatMap<M extends Kind1, A, B>(M: Monad<M>, ma: Fix<M, A>, f: (a: A) => Fix<M, B>) {
  return Monad(M).flatMap(ma, f)
}

export const chain = flatMap

export function flatten<M extends Kind1, A>(M: Monad<M>, ma: Fix<M, Fix<M, A>>): Fix<M, A> {
  return Monad(M).flatMap(ma, x => x)
}

export function composeK<M extends Kind1, A, B, C>(M: Monad<M>, f: (b: B) => Fix<M, C>, g: (a: A) => Fix<M, B>) {
  return (a: A) => Monad(M).flatMap(g(a), f)
}
