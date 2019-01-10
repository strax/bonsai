import { Bounded } from "./Bounded"
import { Type1, Kind1 } from "./Kind1"

export namespace Kind2 {
  export declare const witness: unique symbol

  export declare const refine: unique symbol
  export type refine = typeof refine

  export interface λ<F extends Kind2, A = unknown> extends Kind1<[F, unknown]> {
    [Kind1.refine]: [this] extends [Type1<λ<F, infer A>, infer B>] ? Fix2<F, A, B> : never
  }
}

export interface Kind2<W = any> {
  [Kind2.witness]: W
  [Kind2.refine]: unknown
}

namespace Type2 {
  export declare const witness: unique symbol
}

export interface Type2<F extends Kind2, A, B> extends Type1<Kind2.λ<F, A>, B> {
  [Type2.witness]: [F, A, B]
}

type ToKind2<T extends Type2<any, any, any>> = T[typeof Type2.witness][0]

type Refine<T extends Type2<any, any, any>> = (ToKind2<T> & T)[Kind2.refine]

export type Fix2<F extends Kind2, A, B> = F extends F ? Bounded<Refine<Type2<F, A, B>>, Type2<F, A, B>> : never
