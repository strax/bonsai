import { Constraint } from "./utils"

export namespace Kind2 {
  export const kind = Symbol("Kind3.kind")
  export type kind = typeof kind

  export declare const witness: unique symbol

  export declare const refine: unique symbol
  export type refine = typeof refine
}

export interface Kind2<W = any> {
  [Kind2.witness]: W
  [Kind2.refine]: unknown
}

export interface HasKind2<K extends Kind2> {
  [Kind2.kind]: K
}

namespace Type2 {
  export declare const witness: unique symbol
}

export interface Type2<F extends Kind2, A, B> {
  [Type2.witness]: [F, A, B]
}

export type ToKind2<T extends Type2<any, any, any>> = T[typeof Type2.witness][0]

export type Refine2<T extends Type2<any, any, any>> = (ToKind2<T> & T)[Kind2.refine]

export type Fix2<F extends Kind2, A, B> = F extends F
  ? Constraint<Constraint<Refine2<Type2<F, A, B>>, HasKind2<F>>, Type2<F, A, B>>
  : never
