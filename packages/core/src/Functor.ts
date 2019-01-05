import { Kind, Type1, Refine, Fix } from "./kinds"

export interface Functor<F extends Kind> {
  [Functor.map]<A, B>(this: Fix<F, A>, f: (a: A) => B): Fix<F, B>
}

export namespace Functor {
  export const map = Symbol("Functor.map")
}

export function fmap<F extends HasFunctor<F>, A, B>(fa: Functor<F> & Fix<F, A>, f: (a: A) => B): Fix<F, B> {
  return fa[Functor.map](f)
}

// export function test<F extends Kind, A>(fa: Functor<F> & Type1<F, A>) {
//   return fmap(fmap(fa, () => 2), String)
// }
