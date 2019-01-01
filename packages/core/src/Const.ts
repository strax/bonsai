import { Functor } from "./Functor"
import { Kind, Type1 } from "./kinds"

declare const enum Witness {}

export class Const<A, B = A> implements Functor<ConstK<A>> {
  constructor(private value: A) {}

  get(): A {
    return this.value
  }

  [Functor.map]<B, C>(this: Const<A, B>, f: (b: B) => C): Const<A, C> {
    return new Const(this.get())
  }
}

interface ConstK<A> extends Kind<[Witness, A]> {
  [Kind.refine]: this extends Type1<ConstK<A>, infer B> ? Const<A, B> : never
}

export interface Const<A, B> extends Type1<ConstK<A>, B> {}