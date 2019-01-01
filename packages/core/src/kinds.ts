export interface Kind<W = unknown> {
  // Witnesses that this repr type is associated with a certain type constructor `F`
  [Kind.witness]: W
  // Type member that subtypes substitute to a conditional type that resolves a type application to a concrete type
  [Kind.refine]: unknown
}

declare const enum Void {}

export namespace Kind {
  export declare const witness: unique symbol

  export declare const refine: unique symbol
  export type refine = typeof refine
}

export interface Type1<F extends Kind, A> {
  [TypeWitness]: [F, A]
}

export type Refine<F extends Kind, A> = (F & Type1<F, A>)[Kind.refine]

/**
 * @internal
 */
export declare const TypeWitness: unique symbol
