interface Semigroup<A = unknown> {
  concat(this: A, other: A): A
}

type Validation<E extends Semigroup, A> = Failure<E> | Success<A>

abstract class ValidationFamily<E extends Semigroup, A> {
  abstract isSuccess(): this is Success<A>
  abstract isFailure(): this is Failure<E>

  fold<B>(this: Validation<E, A>, failure: (e: E) => B, success: (a: A) => B): B {
    if (this.isFailure()) {
      return failure(this.get())
    } else {
      return success(this.get())
    }
  }

  map<B>(this: Validation<E, A>, f: (a: A) => B): Validation<E, B> {
    if (this.isSuccess()) {
      return Validation.pure(f(this.get()))
    } else {
      return this
    }
  }

  ap<EE extends Semigroup, AA, B = AA>(
    this: Validation<EE, AA>,
    other: Validation<EE, (a: AA) => B>
  ): Validation<EE, B> {
    if (this.isSuccess()) {
      if (other.isSuccess()) {
        return new Success(other.get()(this.get()))
      } else {
        return new Failure(other.get())
      }
    } else {
      if (other.isSuccess()) {
        return new Failure(this.get())
      } else {
        return new Failure(mconcat(this.get(), other.get()))
      }
    }
  }
}

function mconcat<T extends Semigroup>(a: T, b: T): T {
  return a.concat(b) as T
}

type NonEmptyArray<A> = [A, ...A[]]

declare const nea: NonEmptyArray<string>

mconcat(nea, ["foo", "bar"] as NonEmptyArray<string>)

declare const test: ValidationFamily<NonEmptyArray<string>, string>

declare const enum SuccessKind {}
declare const enum FailureKind {}

class Success<A> extends ValidationFamily<never, A> {
  private [Symbol.species]: SuccessKind

  get(): A {
    return this.a
  }

  isFailure(): false {
    return false
  }

  isSuccess(): this is Success<A> {
    return true
  }

  constructor(private readonly a: A) {
    super()
  }
}

class Failure<E extends Semigroup> extends ValidationFamily<E, never> {
  private [Symbol.species]: FailureKind

  isSuccess(): false {
    return false
  }

  get(): E {
    return this.e
  }

  isFailure(): this is Failure<E> {
    return true
  }

  constructor(private readonly e: E) {
    super()
  }
}

function Tuple<T extends Array<string | number | boolean | symbol | null | undefined | object>>(...args: T): T {
  return args
}

export default ValidationFamily

export namespace Validation {
  export function success<A, E extends Semigroup = never>(a: A): Validation<E, A> {
    return new Success(a)
  }

  export function failure<E extends Semigroup, A = never>(e: E): Validation<E, A> {
    return new Failure(e)
  }

  export function pure<E extends Semigroup, A>(a: A): Validation<E, A> {
    return success<A, E>(a)
  }

  type SequenceA<E extends Semigroup, T extends object> = { [K in keyof T]: Validation<E, T[K]> }

  declare function sequenceA<T extends object, E extends Semigroup>(input: SequenceA<E, T>): Validation<E, T>

  const ss = sequenceA({
    foo: Validation.pure("foo"),
    bar: Validation.failure([new Error()])
  })
}

interface Nested {
  foo: { bar: { baz: boolean } }
  hey: "you"
}

// var foo = prop("baz")(prop("bar")(prop("foo")))

const compose2 = <A, B, C>(f: (b: B) => C, g: (a: A) => B) => (a: A) => f(g(a))

const prop = <K extends string>(k: K) => <S, A>(f: (s: S) => Record<K, A>) => compose2(x => x[k], f)

const nested: Nested = { foo: { bar: { baz: true } }, hey: "you" }

const _id = <A>() => (a: A) => a

const _foo = prop("foo")(_id<Nested>())
const _bar = prop("bar")(_foo)
const _baz = prop("baz")(_bar)

function dimap<A, AA, B, BB>(f: (a: A) => B, i: (a: AA) => A, o: (b: B) => BB): (a: AA) => BB {
  // a => i a |> f |> o
  return a => o(f(i(a)))
}

function first<A, B>(f: (a: A) => B) {
  return <C>([a, c]: [A, C]): [B, C] => [f(a), c]
}

function second<A, B>(f: (a: A) => B) {
  return <C>([c, a]: [C, A]): [C, B] => [c, f(a)]
}

type LensP<S, T, A, B> = (f: (a: A) => B) => ((s: S) => T)

const π1 = <A, C, B>(): LensP<[A, C], [B, C], A, B> => first

const _test = π1<string, number, boolean>()
const set = <S, T, A, B>(h: LensP<S, T, A, B>) => (b: B, s: S): T => h(_ => b)(s)
const get = <S, T, A, B>(h: LensP<S, T, A, B>) => (s: S): A => dimap(h, (a: A) => h(a))

_baz(nested)
