import { Type1, Kind1, Kind2, Type2, Fix } from "./kinds"
import { Functor, fmap, FunctorInstance } from "./Functor"

namespace ConstFunctor {
  export function map<A, B, C>(fa: Const<A, B>, f: (b: B) => C): Const<A, C> {
    return new Const(fa.get())
  }
}

export class Const<A, B> {
  static [Kind1.kind] = (Const as unknown) as Const$λ
  static [Kind2.kind] = (Const as unknown) as ConstKind
  static [Functor.instance] = ConstFunctor;

  [Kind1.kind] = (Const as unknown) as Const$λ<A>;
  [Functor.instance] = ConstFunctor

  constructor(private value: A) {}

  get(): A {
    return this.value
  }
}

export interface Const<A, B> extends Type1<Const$λ<A>, B>, Type2<ConstKind, A, B> {}

declare const enum Witness {}

interface ConstKind extends Kind2<Witness> {
  [Kind2.refine]: [this] extends [Type2<ConstKind, infer A, infer B>] ? Const<A, B> : never
}

// Type lambda that encodes a partially applied Const type : Const a :: * -> *
interface Const$λ<A = unknown> extends Kind1<[ConstKind, A]>, FunctorInstance<Const$λ<A>> {
  [Kind1.refine]: [this] extends [Type1<Const$λ<A>, infer B>] ? Const<A, B> : never
}

const g = fmap(new Const<number, string>(2), x => Symbol("shiet"))
