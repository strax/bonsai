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

export interface HasKind1 {
  [Kind1.kind]: Kind1
}

export interface Type1<F extends HasKind1, A> {
  [TypeWitness]: [F[Kind1.kind], A]
  constructor: F
}

export { Type1 as λ }

// export type Refine<F extends Kind, A> = (F & Type1<F, A>)[Kind.refine]

// Extracts the `F` component of the type witness tuple of `Type1`
export type ToKind<T extends Type1<any, any>> = T[typeof TypeWitness][0]

type ConstrainedGeneric<A, B> = A extends B ? A : A & B

export type Refine<T extends Type1<any, any>> = ConstrainedGeneric<(ToKind<T> & T)[Kind1.refine], T>

export type Fix<F extends HasKind1, A> = Refine<Type1<F, A>>

/**
 * @internal
 */
export declare const TypeWitness: unique symbol
