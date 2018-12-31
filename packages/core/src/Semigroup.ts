export namespace Semigroup {
  export const concat = Symbol("Semigroup.concat")
}

export interface Semigroup<A> {
  [Semigroup.concat](this: A, a1: A): A
}
