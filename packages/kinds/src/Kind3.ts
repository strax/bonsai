import { Bounded } from "./Bounded"
import { Kind2, Type2 } from "./Kind2"

export interface Kind3<W = any> {
  [Kind3.witness]: W
  [Kind3.refine]: unknown
}

export namespace Kind3 {
  export declare const witness: unique symbol

  export declare const refine: unique symbol
  export type refine = typeof refine

  // Encodes partial type application (m :: * -> * -> * -> *) a :: * -> * -> *
  export interface λ<F extends Kind3, A> extends Kind2<[F, A]> {
    [Kind2.refine]: this extends Type2<λ<F, A>, infer B, infer C> ? Fix3<F, A, B, C> : never
  }
}

namespace Type3 {
  export declare const witness: unique symbol
}

export interface Type3<F extends Kind3, A, B, C> extends Type2<Kind3.λ<F, A>, B, C> {
  [Type3.witness]: [F, A, B, C]
}

type ToKind3<T extends Type3<any, any, any, any>> = T[typeof Type3.witness][0]

type Refine<T extends Type3<any, any, any, any>> = (ToKind3<T> & T)[Kind3.refine]

export type Fix3<F extends Kind3, A, B, C> = F extends F ? Bounded<Refine<Type3<F, A, B, C>>, Type3<F, A, B, C>> : never
