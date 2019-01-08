import { Kind1, Type1, HasKind1 } from "../kinds"
import { Applicative } from "../Applicative"
import { Monad } from "../Monad"
import { Functor } from "../Functor"
import { Monoid } from "../Monoid"
import { Traversable } from "../Traversable"

// #region Array :: * -> *
declare const enum Array$Witness {}

interface Array$λ extends Kind1<Array$Witness> {
  [Kind1.refine]: [this] extends [Type1<ArrayConstructor, infer A>] ? Array<A> : never
}

declare global {
  interface ArrayConstructor extends Monad<ArrayConstructor>, Traversable<ArrayConstructor> {
    [Kind1.kind]: Array$λ
  }

  interface Array<T> extends Type1<ArrayConstructor, T> {}
}
// #endregion
