import Tuple from "@bonsai/tuples"

export const enum _ {}
export type TypeParameter = _

export interface λ<T extends Type<any, any>> extends Kind {
  kind: T["kind"]
  arity: Tuple.Count<T["args"], TypeParameter>
  args: T["args"]
  // this: this["arity"] extends 0 ? Fix<T> : never
  this: this
}

export type Lambda<T extends Type<any, any>> = λ<T>

export interface Kind<W = unknown> {
  kind: W
  arity: number
  this: unknown
}

export interface Type<K extends Kind, Args extends Tuple.NE> {
  kind: K
  args: Args
}

export interface Kind1<W = unknown> extends Kind<W> {
  arity: 1
}
export interface Kind2<W = unknown> extends Kind<W> {
  arity: 2
}
export interface Kind3 extends Kind {
  arity: 3
}
export interface Kind4 extends Kind {
  arity: 4
}

export type Type1<K extends Kind1, A> = Type<K, [A]>
export type Type2<K extends Kind2, A, B> = Type<K, [A, B]>
export type Type3<K extends Kind, A, B, C> = Type<K, [A, B, C]>

type FixOne<T extends Tuple, A, K extends string = ""> = {
  [_ in K]: T[0] extends TypeParameter
    ? Tuple.Prepend<A, Tuple.Tail<T>>
    : Tuple.Tail<T> extends infer R
    ? R extends Tuple.NE
      ? Tuple.Prepend<T[0], FixOne<R, A, K>>
      : []
    : []
}[K]

declare const enum Void {}

export type β<T, A> = [T] extends [Type<infer K, infer Args>]
  ? Fix<Type<K, Extract<Args extends Tuple.NE ? FixOne<Args, A> : Args, Tuple.NE>>>
  : never

export type Ap<T, A> = β<T, A>
export type Ap2<T, A, B> = Ap<Ap<T, A>, B>

type Fix<T extends Type<any, any>> = (T["kind"] & T)["this"] extends infer FA ? (FA extends never ? T : FA) : T
// type Fix<T extends Type<any, any>> = (T["kind"] & T)["this"]
