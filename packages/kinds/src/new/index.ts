import Tuple from "@bonsai/tuples"

declare const enum _ {}
type TypeParameter = _

type FromHList<T, Aux extends Array<any> = [], K extends string = ""> = {
  [_ in K]: T extends [infer A, infer B]
    ? FromHList<B, Extract<Tuple.Append<Aux, A>, Tuple>, K>
    : T extends [infer A]
    ? Tuple.Append<Aux, A>
    : Aux
}[K]

type Filter<T extends Tuple, B, K extends string = ""> = {
  [_ in K]: T extends Tuple.NE
    ? Tuple.Head<T> extends B
      ? Tuple.Prepend<Tuple.Head<T>, Extract<Filter<Tuple.Tail<T>, B, K>, Tuple>>
      : Filter<Tuple.Tail<T>, B, K>
    : T extends [infer A]
    ? Tuple.Append<T, A>
    : []
}[K]

type FilterNot<T extends Tuple, B> = Filter<T, Exclude<Tuple.Values<T>, B>>

type zz = Tuple.Length<FilterNot<[1, "a", 3, "foo", "x"], number>>

type Count<T extends Tuple, A> = Tuple.Length<Filter<T, A>>

// ---

interface UnsaturatedType<K extends Kind, Args extends Tuple.NE> {
  kind: K
  arity: Count<Args, TypeParameter>
  args: Args
}

interface λ<T extends Type<any, any>> {
  kind: T["kind"]
  arity: Count<T["args"], TypeParameter>
  args: T["args"]
}

// type λ<T> = T extends Type<infer K, infer Args> ? UnsaturatedType<K, Args> : never

interface Kind {
  arity: number
  this: unknown
}

interface Type<K extends Kind, Args extends Tuple.NE> {
  kind: K
  args: Args
}

interface Kind1 {
  arity: 1
}
interface Kind2 {
  arity: 2
}
interface Kind3 {
  arity: 3
}
interface Kind4 {
  arity: 4
}

type Type2<K extends Kind, A, B> = Type<K, [A, B]>

class Const<A, B> {}

type FixOne<T extends Tuple.NE, A, K extends string = ""> = {
  [_ in K]: T[0] extends TypeParameter
    ? Tuple.Prepend<A, Tuple.Tail<T>>
    : Tuple.Tail<T> extends infer R
    ? R extends Tuple.NE
      ? Tuple.Prepend<T[0], FixOne<R, A, K>>
      : []
    : []
}[K]

type Ap<T, A> = T extends Type<infer K, infer Args>
  ? Fix<Type<K, Extract<Args extends Tuple.NE ? FixOne<Args, A> : Args, Tuple.NE>>>
  : never

declare const enum Const$rep {}
interface Const$type extends Kind2 {
  this: this extends Type<Const$type, [infer A, infer B]> ? Const<A, B> : never
}
interface Const<A, B> extends Type2<Const$type, A, B> {}

type a = string extends never ? true : false

type Fix<T extends Type<any, any>> = (T["kind"] & T)["this"] extends infer FA ? (FA extends never ? T : FA) : T

type t = λ<Const<_, _>>
type saturated = Ap<Ap<t, boolean>, string>
type z = λ<Const<string, Const<void, _>>>

interface Functor<F extends Kind1> {
  map<A, B>(fa: Ap<F, A>, f: (a: A) => B): Ap<F, B>
}

type partial1 = Ap<λ<Const<number, Const<string, _>>>, string>

declare const invalid: Functor<λ<Const<_, _>>>

declare const valid: Functor<λ<Const<string, _>>>
