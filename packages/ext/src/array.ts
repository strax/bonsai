import "./array.types"
import { op } from "./op"
import { Functor, Applicative, Monad, Traversable, pure, fmap, map2 } from "@bonsai/core"
import { Fix } from "@bonsai/core/dist/kinds"

// We need to use an abstract class (or a class) instead of a namespace because
// decorators are not supported with namespaces yet
abstract class ArrayExtensions {
  @op(Array, Functor.map)
  static map<A, B>(fa: Array<A>, f: (a: A) => B): Array<B> {
    return fa.map(a => f(a))
  }

  @op(Array, Applicative.pure)
  static pure<A>(a: A): Array<A> {
    return Array.of(a)
  }

  @op(Array, Applicative.ap)
  static ap<A, B>(fa: Array<A>, fab: Array<(a: A) => B>): Array<B> {
    return ArrayExtensions.flatMap(fa, a => fab.map(f => f(a)))
  }

  @op(Array, Monad.flatMap)
  static flatMap<A, B>(fa: Array<A>, f: (a: A) => Array<B>): Array<B> {
    return fa.flatMap(a => f(a))
  }

  @op(Array, Traversable.traverse)
  static traverse<G extends Applicative<G>, A, B>(as: Array<A>, f: (a: A) => Fix<G, B>): Fix<G, Array<B>> {
    return this.sequence(as.map(f))
  }

  @op(Array, Traversable.sequence)
  static sequence<G extends Applicative<G>, A>(gas: Array<Fix<G, A>>): Fix<G, Array<A>> {
    const xs = gas.map(_ => fmap(_, pure(Array)))
    return xs.reduce((ga0, ga1) => map2(ga0, ga1, (as0, as1) => [...as0, ...as1]))
  }
}
