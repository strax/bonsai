import "./array.types"
import { op } from "./op"
import { Functor } from "../Functor"
import { Applicative } from "../Applicative"
import { Monad } from "../Monad"

// We need to use an abstract class (or a class) instead of a namespace because
// decorators are not supported with namespaces yet
abstract class ArrayExtensions {
  @op(Array.prototype, Functor.map)
  static map<A, B>(this: Array<A>, f: (a: A) => B): Array<B> {
    return this.map(a => f(a))
  }

  @op(Array, Applicative.pure)
  static pure<A>(a: A): Array<A> {
    return Array.of(a)
  }

  @op(Array.prototype, Applicative.ap)
  static ap<A, B>(this: Array<A>, fab: Array<(a: A) => B>): Array<B> {
    return this.flatMap(a => fab.map(f => f(a)))
  }

  @op(Array.prototype, Monad.flatMap)
  static flatMap<A, B>(this: Array<A>, f: (a: A) => Array<B>): Array<B> {
    return this.flatMap(a => f(a))
  }
}
