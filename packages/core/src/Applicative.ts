import { Functor } from "./Functor"
import { Repr, Type1 } from "./kinds"

export interface Applicative<F extends Repr, A> extends Functor<F, A> {
  constructor: {
    [Applicative.pure]<A>(a: A): Type1.Prj<F, A>
  }

  [Applicative.ap]<B>(fab: Type1<F, (a: A) => B>): Type1.Prj<F, B>
}

export namespace Applicative {
  export const pure = Symbol("Applicative.pure")
  export const ap = Symbol("Applicative.ap")
}
