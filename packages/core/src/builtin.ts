import { Repr, Type1, Type2, TypeWitness } from "./kinds"
import { Functor } from "./Functor"
import { Applicative } from "./Applicative"

function alias(target: object, key: symbol, value: unknown) {
  Object.defineProperty(target, key, {
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

interface ArrayK extends Repr<ArrayK.T> {
  [Repr.λ]: this extends Type1<ArrayK, infer A> ? Array<A> : never
}

declare global {
  interface ArrayConstructor {
    [Applicative.pure]<A>(a: A): Array<A>
  }

  interface Array<T> extends Type1<ArrayK, T> {
    constructor: ArrayConstructor
  }

  interface Array<T> extends Functor<ArrayK, T>, Applicative<ArrayK, T> {}
}

alias(Array.prototype, Functor.map, Array.prototype.map)

alias(Array, Applicative.pure, Array.of)
Array.prototype[Applicative.ap] = function Array$Applicative$ap<A, B>(
  this: Array<A>,
  fab: Array<(a: A) => B>
): Array<B> {
  return this.flatMap(a => fab.map(f => f(a)))
}
// #endregion

// #region String
// #endregion
