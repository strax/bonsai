import { Bounded } from "./Bounded"
import Tuple from "@bonsai/tuples"

// Use an uninhabitated type instead of never because conditional subtypes
// cannot be assigned to `never` whereas `T | Void` <: Void
export const enum Void {}

interface Kind {
  [Kind.witness]: unknown
  [Kind.refine]: unknown
}

export namespace Kind {
  export declare const refine: unique symbol
  export type refine = typeof refine

  export declare const witness: unique symbol
  export type witness = typeof witness

  export declare const arity: unique symbol
  export type arity = typeof arity
}

export interface Kind1<W = any> extends Kind {
  [Kind.witness]: W
  [Kind.arity]: 1
  [Kind.refine]: Type1<Kind1<W>, unknown>
}

export interface Type<F extends Kind, Args extends Tuple> {
  [Type.witness]: [F, Args]
}

export namespace Type {
  export declare const witness: unique symbol
  export type witness = typeof witness

  export type ToKind<T extends Type<any, any>> = T[Type.witness][0]
  export type ToArgs<T extends Type<any, any>> = T[Type.witness][1]
}

export type Type1<F extends Kind1, A> = Type<F, [A]>

// Extracts the `F` component of th type witness tuple of `Type1`
type ToKind<T extends Type<any, any>> = T[typeof Type.witness][0]

// The beef: when the kind interface is intersected with Type1, the conditional type
// in Kind1.refine can be used to narrow down the type back to its concrete form
export type Refine<T extends Type<any, any>> = (ToKind<T> & T)[Kind.refine]

// export type Fix<F extends Kind1, A> = F extends F ? Bounded<Refine1<Type1<F, A>>, Type1<F, A>> : never
// export type Ap<F extends Kind1, A> = F extends F ? Bounded<Refine<Type1<F, A>>, Type1<F, A>> : never
export type Ap<F extends Kind1, A> = F extends F ? Refine<Type1<F, A>> : Type1<F, A>

export interface Kind2<W = any> extends Kind {
  [Kind.witness]: W
  [Kind.arity]: 2
  [Kind.refine]: Type2<Kind2<W>, unknown, unknown>
}

export type Type2<F extends Kind2, A, B> = Type<F, [A, B]>

export type Ap2<F extends Kind2, A, B> = F extends F ? Bounded<Refine<Type2<F, A, B>>, Type2<F, A, B>> : never

export interface Kind3<W = any> extends Kind {
  [Kind.witness]: W
  [Kind.arity]: 3
  [Kind.refine]: Type3<Kind3<W>, unknown, unknown, unknown>
}

export type Type3<F extends Kind3, A, B, C> = Type<F, [A, B, C]>

export type Ap3<F extends Kind3, A, B, C> = F extends F ? Bounded<Refine<Type3<F, A, B, C>>, Type3<F, A, B, C>> : never
