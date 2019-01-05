import { Functor } from "./Functor"
import { Kind, Type1 } from "./kinds"

declare const enum Witness {}

export class Const<A, B = A> implements Functor<Const$Kind<A>> {
  constructor(private value: A) {}

  get(): A {
    return this.value
  }

  readonly map = this[Functor.map];

  [Functor.map]<B, C>(this: Const<A, B>, f: (b: B) => C): Const<A, C> {
    return new Const(this.get())
  }
}

export interface Const<A, B> extends Type1<Const$Kind<A>, B> {}

interface Const$Kind<A> extends Kind<[Witness, A]> {
  [Kind.refine]: [this] extends [Type1<Const$Kind<A>, infer B>] ? Const<A, B> : never
}
