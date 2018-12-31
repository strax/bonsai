export interface Repr<W = unknown> {
  // Witnesses that this repr type is associated with a certain type constructor `F`
  [Repr.witness]: W
  // Type member that subtypes substitute to a conditional type that resolves a type application to a concrete type
  [Repr.λ]: unknown
}

export namespace Repr {
  export declare const witness: unique symbol

  export declare const λ: unique symbol
  export type λ = typeof λ
}

export interface Type1<F extends Repr, X> {
  [TypeWitness]: [F, X]
}

export namespace Type1 {
  export type Prj<F extends Repr, A> = (F & Type1<F, A>)[Repr.λ]
}

export interface Type2<F extends Repr, X1, X2> {
  [TypeWitness]: [F, X1, X2]
}

export namespace Type2 {
  export type Prj<F extends Repr, A, B> = (F & Type2<F, A, B>)[Repr.λ]
}

/**
 * @internal
 */
export declare const TypeWitness: unique symbol

// #endregion

// Normal generic class here, implicitly forms a functor
// #region Augments builtin Array to support HKTs
