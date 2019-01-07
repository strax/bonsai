import "./array.types"
import { op } from "./op"
import { Functor } from "../Functor"
import { Applicative } from "../Applicative"
import { Monad } from "../Monad"
import { Monoid } from "../Monoid"

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
}
