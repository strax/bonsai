export namespace Setoid {
  export const eq = Symbol("Setoid.eq")

  export function from<A extends HasSetoid<A>>(a: A): Setoid<A> {
    return a.constructor
  }
}

export interface Setoid<A> {
  [Setoid.eq](a0: A, a1: A): boolean
}

interface HasSetoid<A> {
  constructor: Setoid<A>
}

export function eq<A extends HasSetoid<A>>(a0: A, a1: A) {
  const S = a0.constructor
  return S[Setoid.eq](a0, a1)
}
