import { Generic, Of, TypeFamily, Kind1, Generic1 } from "tshkt"
import { IsFunctor } from "./Functor"

interface ConstF<A> extends TypeFamily<Kind1> {
  (): Const<A, this[0]>
}

export class Const<A, B> {
  [Generic.Type]: Generic1<ConstF<A>, B>

  constructor(private value: A) {}

  get(): A {
    return this.value
  }

  map<C>(f: (b: B) => C): Const<A, C> {
    return new Const(this.get())
  }
}

function asVoid<F extends IsFunctor<F>, A>(fa: Of<F, A>): Of<F, void> {
  return fa.map(() => void 0 as void)
}

asVoid(new Const<string, number>("foo"))