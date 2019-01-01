import { Kind, Type1, Refine } from "./kinds"

export interface Functor<F extends Kind, A> extends Type1<F, A> {
  [Functor.map]<B>(f: (a: A) => B): Refine<Type1<F, B>>
}

export namespace Functor {
  export const map = Symbol("Functor.map")
}

export function fmap<F extends Kind, A, B>(fa: Functor<F, A>, f: (a: A) => B) {
  return fa[Functor.map](f)
}
