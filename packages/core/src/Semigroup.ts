export interface Semigroup<A> {
  concat(this: A, other: A): A
}
