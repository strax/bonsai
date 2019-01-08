import { Kind1, Type1, Kind2, Type2, MonadInstance } from "@bonsai/core"

import { FutureInstance, FutureTypeRep } from "fluture"
declare const enum Witness {}

export interface FutureKind extends Kind2<Witness>, FutureTypeRep {
  [Kind2.refine]: [this] extends [Type2<FutureKind, infer L, infer R>] ? FutureInstance<L, R> : never
}

export interface Future$λ<L = unknown> extends Kind1<[FutureKind, L]>, MonadInstance<Future$λ<L>> {
  [Kind1.refine]: [this] extends [Type1<Future$λ<L>, infer R>] ? FutureInstance<L, R> : never
}

declare module "fluture" {
  interface FutureTypeRep extends MonadInstance<Future$λ> {
    [Kind2.kind]: FutureKind
    [Kind1.kind]: Future$λ
  }

  interface FutureInstance<L, R> {
    [Kind2.kind]: FutureKind
    [Kind1.kind]: Future$λ<L>
  }

  interface FutureInstance<L, R> extends Type2<FutureKind, L, R>, Type1<Future$λ<L>, R> {}
}
