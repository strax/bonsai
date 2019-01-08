export interface Kind1<W = any> {
  [Kind1.witness]: W
  // Type member that subtypes substitute to a conditional type that resolves a type application to a concrete type
  [Kind1.refine]: unknown
}

declare const enum Void {}

export namespace Kind1 {
  export const kind = Symbol("Kind1.kind")
  export type kind = typeof kind

  export declare const witness: unique symbol

  export declare const refine: unique symbol
  export type refine = typeof refine
}

export interface Kind2<W = any> {
  [Kind2.witness]: W
  [Kind2.refine]: unknown
}

export namespace Kind2 {
  export const kind = Symbol("Kind1.kind")
  export type kind = typeof kind

  export declare const witness: unique symbol

  export declare const refine: unique symbol
  export type refine = typeof refine
}

export interface HasKind1<K extends Kind1> {
  [Kind1.kind]: K
}

export interface HasKind2 {
  [Kind2.kind]: Kind2
}

namespace Type1 {
  export declare const witness: unique symbol
}

export interface Type1<F extends Kind1, A> {
  [Type1.witness]: [F, A]
}

namespace Type2 {
  export declare const witness: unique symbol
}

export interface Type2<F extends Kind2, A, B> {
  [Type2.witness]: [F, A, B]
}

export { Type1 as λ }

// export type Refine<F extends Kind, A> = (F & Type1<F, A>)[Kind.refine]

// Extracts the `F` component of the type witness tuple of `Type1`
export type ToKind1<T extends Type1<any, any>> = T[typeof Type1.witness][0]
export type ToKind2<T extends Type2<any, any, any>> = T[typeof Type2.witness][0]

type Constraint<A, B> = A extends A ? (A extends B ? A : (A & B)) : never

export type Refine1<T extends Type1<any, any>> = (ToKind1<T> & T)[Kind1.refine]

export type Refine2<T extends Type2<any, any, any>> = (ToKind2<T> & T)[Kind2.refine]

export type Fix<F extends Kind1, A> = F extends F
  ? Constraint<Constraint<Refine1<Type1<F, A>>, HasKind1<F>>, Type1<F, A>>
  : never

export type Fix2<F extends Kind2, A, B> = Refine2<Type2<F, A, B>>

/**
 * @internal
 */
export declare const TypeWitness: unique symbol
