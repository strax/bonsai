import { Semigroup } from "./Semigroup"

export namespace Monoid {
  export const empty = Symbol("Monoid.empty")
}

export interface Monoid<A> extends Semigroup<A> {
  [Monoid.empty](): A
}
