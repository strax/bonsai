import { Kind, Type1 } from "../kinds"
import { Applicative } from "../Applicative"
import { Monad } from "../Monad"

// #region Array :: * -> *
declare const enum Array$Witness {}

interface Array$Kind extends Kind<Array$Witness> {
  [Kind.refine]: this extends Type1<Array$Kind, infer A> ? Array<A> : never
}

declare global {
  interface ArrayConstructor {
    [Applicative.pure]<A>(a: A): Array<A>
  }

  interface Array<T> extends Type1<Array$Kind, T> {
    constructor: ArrayConstructor
  }

  interface Array<T> extends Monad<Array$Kind> {}
}
// #endregion
