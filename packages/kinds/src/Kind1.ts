import { Bounded } from "./Bounded"
import Tuple from "@bonsai/tuples"

export interface Kind1<W = any> {
  [Kind1.witness]: W
  // Type member that subtypes substitute to a conditional type that resolves a type application to a concrete type
  [Kind1.refine]: unknown
}

export namespace Kind1 {
  export declare const kind: unique symbol
  export type kind = typeof kind
  export declare const witness: unique symbol
  export type witness = typeof witness

  export declare const refine: unique symbol
  export type refine = typeof refine
}

export namespace Type1 {
  export declare const witness: unique symbol
  export type witness = typeof witness
}

type AsTuple<T> = T extends [any, ...any[]] ? T : [T]

export interface Type1<F extends Kind1, A> {
  [Type1.witness]: [F, A]
}

// Extracts the `F` component of th type witness tuple of `Type1`
type ToKind1<T extends Type1<any, any>> = T[typeof Type1.witness][0]

// The beef: when the kind interface is intersected with Type1, the conditional type
// in Kind1.refine can be used to narrow down the type back to its concrete form
export type Refine1<T extends Type1<any, any>> = (ToKind1<T> & T)[Kind1.refine]

// export type Fix<F extends Kind1, A> = F extends F ? Bounded<Refine1<Type1<F, A>>, Type1<F, A>> : never
export type Fix<F extends Kind1, A> = F extends F ? Bounded<Refine1<Type1<F, A>>, Type1<F, A>> : never
