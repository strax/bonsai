import { MonadInstance, TraversableInstance } from "@bonsai/core"
import { Kind1, Type1 } from "@bonsai/kinds"

// #region Array :: * -> *
declare const enum Array$witness {}

interface Array$kind extends Kind1<Array$witness> {
  [Kind1.refine]: [this] extends [Type1<Array$kind, infer A>] ? Array<A> : never
}

declare global {
  interface ArrayConstructor extends MonadInstance<Array$kind>, TraversableInstance<Array$kind> {}

  interface Array<T> extends Type1<Array$kind, T> {}
}
// #endregion
