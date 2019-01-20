import { Kind1, Kind, Type1, Ap } from "@bonsai/kinds"
import { MonadSyntax } from "./Monad"
import { Applicative, map2 } from "./Applicative"

export class List<A> extends MonadSyntax<List$kind> implements Iterable<A> {
  private values: Array<A>;

  [Symbol.iterator](): Iterator<A> {
    return this.values[Symbol.iterator]()
  }

  constructor(values: Array<A>) {
    super(List)
    this.values = [...values]
  }
}

export namespace List {
  export function map<A, B>(fa: List<A>, f: (a: A) => B): List<B> {
    return new List(Array.from(fa).map(f))
  }

  export function pure<A>(a: A): List<A> {
    return new List([a])
  }

  export function ap<A, B>(fa: List<A>, fab: List<(a: A) => B>): List<B> {
    return flatMap(fab, f => map(fa, f))
  }

  export function flatMap<A, B>(fa: List<A>, f: (a: A) => List<B>): List<B> {
    return new List(Array.from(fa).flatMap(a => Array.from(f(a))))
  }

  export function append<A>(as: List<A>, a: A): List<A> {
    return new List([...Array.from(as), a])
  }

  export function traverse<G extends Kind1, A, B>(
    A: Applicative<G>,
    as: List<A>,
    f: (a: A) => Ap<G, B>
  ): Ap<G, List<B>> {
    return sequence(A, as.map(f))
  }

  export function sequence<G extends Kind1, A>(A: Applicative<G>, gas: List<Ap<G, A>>): Ap<G, List<A>> {
    const { pure } = Applicative(A)
    const acc = pure(new List<A>([]))
    return Array.from(gas).reduce((acc, a) => map2(A, acc, a, append), acc)
  }
}

// #region Kind * -> *
declare const enum List$witness {}
interface List$kind extends Kind1<List$witness> {
  [Kind.refine]: this extends Type1<List$kind, infer A> ? List<A> : never
}
export interface List<A> extends Type1<List$kind, A> {}
// #endregion
