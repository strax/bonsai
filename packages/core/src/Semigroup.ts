export namespace Semigroup {
  export const concat = Symbol("Semigroup.concat")
}

export interface Semigroup<A> {
  [Semigroup.concat](a0: A, a1: A): A
}
