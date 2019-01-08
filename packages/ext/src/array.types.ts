import { Kind1, Type1, Monad, Traversable, MonadInstance, TraversableInstance } from "@bonsai/core"

// #region Array :: * -> *
declare const enum Array$Witness {}

interface ArrayKind extends Kind1<Array$Witness>, MonadInstance<ArrayKind>, TraversableInstance<ArrayKind> {
  [Kind1.refine]: [this] extends [Type1<ArrayKind, infer A>] ? Array<A> : never
}

declare global {
  interface ArrayConstructor extends MonadInstance<ArrayKind>, TraversableInstance<ArrayKind> {
    [Kind1.kind]: ArrayKind
  }

  interface Array<T> extends Type1<ArrayKind, T>, MonadInstance<ArrayKind>, TraversableInstance<ArrayKind> {
    [Kind1.kind]: ArrayKind
  }
}
// #endregion
