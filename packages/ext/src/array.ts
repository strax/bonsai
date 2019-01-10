import "./array.types"
import { Applicative, map2 } from "@bonsai/core"
import { Fix, Kind1 } from "@bonsai/kinds"

namespace ArrayExtensions {
  export function map<A, B>(fa: Array<A>, f: (a: A) => B): Array<B> {
    return fa.map(a => f(a))
  }

  export function pure<A>(a: A): Array<A> {
    return [a]
  }

  export function ap<A, B>(fa: Array<A>, fab: Array<(a: A) => B>): Array<B> {
    return flatMap(fa, a => fab.map(f => f(a)))
  }

  export function traverse<G extends Kind1, A, B>(
    G: Applicative<G>,
    as: Array<A>,
    f: (a: A) => Fix<G, B>
  ): Fix<G, Array<B>> {
    return sequence(G, as.map(f))
  }

  export function sequence<G extends Kind1, A>(G: Applicative<G>, gas: Array<Fix<G, A>>): Fix<G, Array<A>> {
    const A = Applicative(G)
    return gas.reduce((ga0, ga1) => map2(A, ga0, ga1, (as0, as1) => [...as0, as1]), A.pure([] as A[]))
  }

  export function flatMap<A, B>(fa: Array<A>, f: (a: A) => Array<B>): Array<B> {
    return fa.flatMap(a => f(a))
  }
}

Object.assign(Array, ArrayExtensions)
