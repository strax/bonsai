import { Functor } from "./Functor"
import { Kind, Type1, Refine } from "./kinds"

export interface Applicative<F extends Kind, A> extends Functor<F, A> {
  constructor: {
    [Applicative.pure]<A>(a: A): Refine<F, A>
  }

  [Applicative.ap]<B>(fab: Type1<F, (a: A) => B>): Refine<F, B>
}

export namespace Applicative {
  export const pure = Symbol("Applicative.pure")
  export const ap = Symbol("Applicative.ap")
}
