import { Constraint } from "./utils"

export interface Kind3<W = any> {
  [Kind3.witness]: W
  [Kind3.refine]: unknown
}

export namespace Kind3 {
  export const kind = Symbol("Kind3.kind")
  export type kind = typeof kind

  export declare const witness: unique symbol

  export declare const refine: unique symbol
  export type refine = typeof refine
}

export interface HasKind3<K extends Kind3> {
  [Kind3.kind]: K
}

namespace Type3 {
  export declare const witness: unique symbol
}

export interface Type3<F extends Kind3, A, B, C> {
  [Type3.witness]: [F, A, B, C]
}

export type ToKind3<T extends Type3<any, any, any, any>> = T[typeof Type3.witness][0]

export type Refine3<T extends Type3<any, any, any, any>> = (ToKind3<T> & T)[Kind3.refine]

export type Fix3<F extends Kind3, A, B, C> = F extends F
  ? Constraint<Constraint<Refine3<Type3<F, A, B, C>>, HasKind3<F>>, Type3<F, A, B, C>>
  : never
