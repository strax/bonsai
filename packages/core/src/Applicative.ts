import { Functor } from "./Functor"
import { Kind, Type1, Refine } from "./kinds"

export interface Applicative<F extends Kind> extends Functor<F> {
  constructor: {
    [Applicative.pure]<A>(a: A): Refine<Type1<F, A>>
  }

  [Applicative.ap]<A, B>(this: Type1<F, A>, fab: Type1<F, (a: A) => B>): Refine<Type1<F, B>>
}

export namespace Applicative {
  export const pure = Symbol("Applicative.pure")
  export const ap = Symbol("Applicative.ap")
}
