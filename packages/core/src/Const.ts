import { Type1, Kind1, Refine } from "./kinds"
import { Functor, fmap } from "./Functor"

@protocol<Functor<Const$λ>>()
export class Const<A, B> {
  static [Kind1.kind]: Const$λ

  static [Functor.map]<A, B, C>(fa: Const<A, B>, f: (b: B) => C): Const<A, C> {
    return new Const(fa.value)
  }

  constructor(private value: A) {}
}

type ConstConstructor = typeof Const

export interface Const<A, B> extends Type1<Const$λ<A>, B> {}

declare const enum Witness {}

interface Const$λ<A = never> extends Kind1<[Witness, A]>, ConstConstructor {
  [Kind1.refine]: [this] extends [Type1<Const$λ<infer A>, infer B>] ? Const<A, B> : never
}

const g = fmap(new Const<number, string>(2), x => x)
