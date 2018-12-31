import { Repr, Type1 } from "./kinds"

export interface Functor<F extends Repr, A> extends Type1<F, A> {
  [Functor.map]<B>(f: (a: A) => B): Type1.Prj<F, B>
}

export namespace Functor {
  export const map = Symbol("Functor.map")
}

export function fmap<F extends Repr, A, B>(fa: Functor<F, A>, f: (a: A) => B): Type1.Prj<F, B> {
  return fa[Functor.map](f)
}

export function voidRight<F extends Repr, A, B>(a: A, fb: Functor<F, B>): Type1.Prj<F, A> {
  return fmap(fb, _ => a)
}
