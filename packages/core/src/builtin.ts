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
namespace Array$Kind {
  export const enum T {}
}

interface Array$Kind extends Kind<Array$Kind.T> {
  [Kind.refine]: this extends Type1<Array$Kind, infer A> ? Array<A> : never
}

declare global {
  interface ArrayConstructor {
    [Applicative.pure]<A>(a: A): Array<A>
  }

  interface Array<T> extends Type1<Array$Kind, T> {
    constructor: ArrayConstructor
  }

  interface Array<T> extends Monad<Array$Kind> {}
}

namespace ArrayExtensions {
  export function map<A, B>(this: Array<A>, f: (a: A) => B): Array<B> {
    return this.map(a => f(a))
  }

  export function pure<A>(a: A): Array<A> {
    return Array.of(a)
  }

  export function ap<A, B>(this: Array<A>, fab: Array<(a: A) => B>): Array<B> {
    return this.flatMap(a => fab.map(f => f(a)))
  }

  export function flatMap<A, B>(this: Array<A>, f: (a: A) => Array<B>): Array<B> {
    return this.flatMap(a => f(a))
  }
}

inject(Array.prototype, Functor.map, ArrayExtensions.map)

inject(Array, Applicative.pure, ArrayExtensions.pure)
inject(Array.prototype, Applicative.ap, ArrayExtensions.ap)

inject(Array.prototype, Monad.flatMap, ArrayExtensions.flatMap)
// #endregion
