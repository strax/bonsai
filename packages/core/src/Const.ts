import { Functor } from "./Functor"
import { Repr, Type1 } from "./kinds"

declare const enum Witness {}

export class Const<A, B> {
  constructor(private value: A) {}

  get(): A {
    return this.value
  }

  [Functor.map]<C>(f: (b: B) => C): Const<A, C> {
    return new Const(this.get())
  }
}

export interface ConstK<A> extends Repr<[Witness, A]> {
  [Repr.λ]: this extends Type1<ConstK<A>, infer B> ? Const<A, B> : never
}

export interface Const<A, B> extends Type1<ConstK<A>, B> {}
