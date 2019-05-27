import { id } from "@bonsai/core"
import { TypeFamily, Kind1, Generic, Generic1 } from "tshkt";

const isNot = <A>(a: A) => <B>(b: A | B): b is Exclude<B, A> => b !== a

interface OptionF extends TypeFamily<Kind1> {
  (): Option<this[0]>
}

export abstract class Option<A> {
  [Generic.Type]: Generic1<OptionF, A>
  ["constructor"]: typeof Option

  abstract get(): A
  abstract isEmpty(): boolean

  static of<A>(a: A): Option<A> {
    return new Some(a)
  }

  constructor() {
  }

  fold<B>(f: (a: A) => B, b: () => B): B {
    return this.isEmpty() ? b() : f(this.get())
  }

  map<B>(f: (a: A) => B): Option<B> {
    return this.fold<Option<B>>(a => Option.of(f(a)), () => None)
  }

  mapOpt<B>(f: (a: A) => B | null | undefined): Option<B> {
    return this.flatMap(a => Option.option(f(a)))
  }

  orElseL<B>(this: Option<B>, fb: () => Option<B>): Option<B> {
    return this.fold(Option.of, fb)
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
    return this.flatMap(a => (f(a) ? Option.of(a) : Option.empty()))
  }

  ap<B>(fab: Option<(a: A) => B>): Option<B> {
    return fab.flatMap(f => this.map(f))
  }

  flatMap<B>(f: (a: A) => Option<B>): Option<B> {
    return this.fold(f, () => None)
  }
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

export namespace Option {
  export function option<A>(a: A | undefined | null): Option<A> {
    return new Some(a)
      .filter(isNot(undefined))
      .filter(isNot(null))
  }

  export function empty(): Option<never> {
    return None
  }
}

export default Option
