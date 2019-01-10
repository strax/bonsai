import { Kind1, Fix } from "@bonsai/kinds"

export interface FunctorInstance<F extends Kind1> {
  [Functor.map]<A, B>(fa: Fix<F, A>, f: (a: A) => B): Fix<F, B>
}

export interface FunctorOps<F extends Kind1> {
  map<A, B>(fa: Fix<F, A>, f: (a: A) => B): Fix<F, B>
}

export abstract class FunctorSyntax<F extends Kind1> {
  private functor: FunctorOps<F>

  constructor(F: Functor<F>) {
    this.functor = Functor(F)
  }

  map<G extends F, A, B>(this: Fix<G, A>, f: (a: A) => B): Fix<G, B> {
    return (this as FunctorSyntax<G>).functor.map(this, f)
  }
}

export function FunctorOps<F extends Kind1>(F: FunctorInstance<F>) {
  return class implements FunctorOps<F> {
    map = F[Functor.map]
  }
}

export function Functor<F extends Kind1>(from: Functor<F>): FunctorOps<F> {
  if (Functor.map in from) {
    return new (FunctorOps(from as FunctorInstance<F>))()
  } else {
    return from as FunctorOps<F>
  }
}

export type Functor<F extends Kind1> = FunctorInstance<F> | FunctorOps<F>

export namespace Functor {
  export const map = Symbol("Functor.map")
}

export function fmap<F extends Kind1, A, B>(F: Functor<F>, fa: Fix<F, A>, f: (a: A) => B): Fix<F, B> {
  return Functor(F).map(fa, f)
}
