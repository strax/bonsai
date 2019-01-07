import { Kind1, Fix, HasKind1 } from "./kinds"

export interface Functor<F extends Functor<F>> extends HasKind1 {
  [Functor.map]<A, B>(fa: Fix<F, A>, f: (a: A) => B): Fix<F, B>
}

export namespace Functor {
  export const map = Symbol("Functor.map")
}

export function fmap<F extends Functor<F>, A, B>(fa: Fix<F, A>, f: (a: A) => B): Fix<F, B> {
  return fa.constructor[Functor.map](fa, f)
}
