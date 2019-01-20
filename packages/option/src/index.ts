import { id, MonadSyntax } from "@bonsai/core"
import { Kind1, Type1, Kind, Void } from "@bonsai/kinds"

const isNot = <A>(a: A) => <B>(b: A | B): b is Exclude<B, A> => b !== a

export abstract class Option<A> extends MonadSyntax<Option$kind> {
  abstract get(): A
  abstract isEmpty(): boolean

  constructor() {
    super(Option)
  }

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

// #region Monad<Option>
export namespace Option {
  export function map<A, B>(fa: Option<A>, f: (a: A) => B): Option<B> {
    return fa.fold(a => pure(f(a)), () => None)
  }

  export function pure<A>(a: A): Option<A> {
    return new Some(a)
  }

  export function ap<A, B>(fa: Option<A>, ff: Option<(a: A) => B>): Option<B> {
    return ff.flatMap(f => fa.map(f))
  }

  export function flatMap<A, B>(fa: Option<A>, f: (a: A) => Option<B>): Option<B> {
    return fa.fold(f, () => None)
  }
}
// #endregion

// #region Bonsai HKT encoding
declare const enum Option$witness {}
interface Option$kind extends Kind1<Option$witness> {
  [Kind.refine]: this extends Type1<Option$kind, infer A> ? Option<A> : never
}

export interface Option<A> extends Type1<Option$kind, A> {}
// #endregion

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

export namespace Option {
  export function option<A>(a: A | undefined | null): Option<A> {
    return pure(a)
      .filter(isNot(undefined))
      .filter(isNot(null))
  }

  export function empty(): Option<never> {
    return None
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
