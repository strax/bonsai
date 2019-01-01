import { Kind, TypeWitness, Type1 } from "./kinds"
import { Functor } from "./Functor"
import { Applicative } from "./Applicative"
import { Monad } from "./Monad"

function inject(target: object, key: symbol, value: unknown) {
  Reflect.defineProperty(target, key, {
    configurable: false,
    enumerable: false,
    writable: false,
    value
  })
}

// #region Array :: * -> *
namespace ArrayK {
  export const enum T {}
}

interface ArrayK extends Kind<ArrayK.T> {
  [Kind.refine]: this extends Type1<ArrayK, infer A> ? Array<A> : never
}

declare global {
  interface ArrayConstructor {
    [Applicative.pure]<A>(a: A): Array<A>
  }

  interface Array<T> extends Type1<ArrayK, T> {
    constructor: ArrayConstructor
  }

  interface Array<T> extends Functor<ArrayK, T>, Applicative<ArrayK, T>, Monad<ArrayK, T> {}
}

function Array$Functor$map<A, B>(this: Array<A>, f: (a: A) => B): Array<B> {
  return this.map(a => f(a))
}

function Array$Applicative$pure<A>(a: A): Array<A> {
  return Array.of(a)
}

function Array$Applicative$ap<A, B>(this: Array<A>, fab: Array<(a: A) => B>): Array<B> {
  return this.flatMap(a => fab.map(f => f(a)))
}

function Array$Monad$flatMap<A, B>(this: Array<A>, f: (a: A) => Array<B>): Array<B> {
  return this.flatMap(a => f(a))
}

inject(Array.prototype, Functor.map, Array$Functor$map)

inject(Array, Applicative.pure, Array$Applicative$pure)
inject(Array.prototype, Applicative.ap, Array$Applicative$ap)

inject(Array.prototype, Monad.flatMap, Array$Monad$flatMap)
// #endregion
