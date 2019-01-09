import { Kind1, Fix, HasKind1 } from "./Kind1"

export interface Functor<F extends Kind1> {
  map<A, B>(fa: Fix<F, A>, f: (a: A) => B): Fix<F, B>
}

export interface FunctorInstance<F extends Kind1> {
  [Functor.instance]: Functor<F>
}

export interface IsFunctor extends Kind1 {
  [Functor.instance]: Functor<this>
}

export function Functor<F extends IsFunctor>(F: HasKind1<F>): Functor<F> {
  return F[Kind1.kind][Functor.instance]
}

export namespace Functor {
  export const instance = Symbol("Functor.instance")
}

export function fmap<F extends IsFunctor, A, B>(fa: Fix<F, A>, f: (a: A) => B): Fix<F, B> {
  return Functor<F>(fa).map(fa, f)
}
