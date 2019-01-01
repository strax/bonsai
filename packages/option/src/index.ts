import { Kind, id, Type1, Functor, Monad, Applicative } from "@bonsai/core"

declare const enum Witness {}
interface Option$Kind extends Kind<Witness> {
  [Kind.refine]: this extends Type1<Option$Kind, infer A> ? Option<A> : never
}

const isNot = <A>(a: A) => <B>(b: A | B): b is Exclude<B, A> => b !== a

abstract class Option<A> implements Monad<Option$Kind> {
  abstract get(): A
  abstract isEmpty(): boolean

  static [Applicative.pure]<A>(a: A): Option<A> {
    return Option.pure(a)
  }

  [Functor.map]<A, B>(this: Option<A>, f: (a: A) => B): Option<B> {
    return this.fold(a => Option.pure(f(a)), Option.empty)
  }

  [Applicative.ap]<A, B>(this: Option<A>, fab: Option<(a: A) => B>): Option<B> {
    return fab.flatMap(f => this.map(a => f(a)))
  }

  [Monad.flatMap]<A, B>(this: Option<A>, f: (a: A) => Option<B>): Option<B> {
    return this.fold(f, Option.empty)
  }

  [Monad.flatten]<A>(this: Option<Option<A>>): Option<A> {
    return this.flatMap(id)
  }

  readonly map = this[Functor.map]
  readonly ap = this[Applicative.ap]
  readonly flatMap = this[Monad.flatMap]
  readonly flatten = this[Monad.flatten]

  fold<B>(f: (a: A) => B, b: () => B): B {
    return this.isEmpty() ? b() : f(this.get())
  }

  mapOpt<B>(f: (a: A) => B | null | undefined): Option<B> {
    return this.flatMap(a => Option.option(f(a)))
  }

  orElseL<B>(this: Option<B>, fb: () => Option<B>): Option<B> {
    return this.fold(Option.pure, fb)
  }

  orElse<B>(this: Option<B>, fb: Option<B>): Option<B> {
    return this.orElseL(() => fb)
  }

  getOrElse<B>(this: Option<B>, b: B): B {
    return this.getOrElseL(() => b)
  }

  getOrElseL<B>(this: Option<B>, b: () => B): B {
    return this.fold(id, b)
  }

  orUndefined(): A | undefined {
    return this.fold(id, () => undefined)
  }

  filter<B extends A>(f: (a: A) => a is B): Option<B>
  filter(f: (a: A) => boolean): Option<A>
  filter(f: (a: A) => boolean): Option<A> {
    return this.flatMap(a => (f(a) ? Option.pure(a) : Option.empty()))
  }
}

interface Option<A> extends Type1<Option$Kind, A> {
  constructor: typeof Option
}

export class Some<A> extends Option<A> {
  constructor(private value: A) {
    super()
  }

  get() {
    return this.value
  }

  isEmpty() {
    return false
  }

  toString() {
    return `Some(${this.get()})`
  }
}

const None = new class None extends Option<never> {
  get(): never {
    throw new Error("None.get")
  }

  isEmpty() {
    return true
  }

  toString() {
    return "None"
  }
}()

namespace Option {
  export function option<A>(a: A | undefined | null): Option<A> {
    return pure(a)
      .filter(isNot(undefined))
      .filter(isNot(null))
  }

  export function pure<A>(a: A): Option<A> {
    return new Some(a)
  }

  export function empty(): Option<never> {
    return None
  }

  export function sequence<A>(fas: Array<Option<A>>): Option<Array<A>> {
    return fas.reduce((fas, fa) => map2(fas, fa, (as, a) => [...as, a]), pure<Array<A>>([]))
  }

  // #region map2..map6
  export function map2<A, B, C>(oa: Option<A>, ob: Option<B>, f: (a: A, b: B) => C): Option<C> {
    return oa.flatMap(a => ob.map(b => f(a, b)))
  }

  export function map3<A, B, C, D>(oa: Option<A>, ob: Option<B>, oc: Option<C>, f: (a: A, b: B, c: C) => D): Option<D> {
    return oa.flatMap(a => Option.map2(ob, oc, (...args) => f(a, ...args)))
  }

  export function map4<A, B, C, D, E>(
    oa: Option<A>,
    ob: Option<B>,
    oc: Option<C>,
    od: Option<D>,
    f: (a: A, b: B, c: C, d: D) => E
  ): Option<E> {
    return oa.flatMap(a => Option.map3(ob, oc, od, (...args) => f(a, ...args)))
  }

  export function map5<A, B, C, D, E, F>(
    oa: Option<A>,
    ob: Option<B>,
    oc: Option<C>,
    od: Option<D>,
    oe: Option<E>,
    f: (a: A, b: B, c: C, d: D, e: E) => F
  ): Option<F> {
    return oa.flatMap(a => Option.map4(ob, oc, od, oe, (...args) => f(a, ...args)))
  }

  export function map6<A, B, C, D, E, F, G>(
    oa: Option<A>,
    ob: Option<B>,
    oc: Option<C>,
    od: Option<D>,
    oe: Option<E>,
    of: Option<F>,
    g: (a: A, b: B, c: C, d: D, e: E, f: F) => G
  ): Option<G> {
    return oa.flatMap(a => Option.map5(ob, oc, od, oe, of, (...args) => g(a, ...args)))
  }
  // #endregion
}

export default Option
