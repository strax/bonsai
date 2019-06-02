import { Type1 } from "./types";
import { Of, Generic, Generic1 } from "tshkt";
import { IsFunctor } from "@bonsai/core";

declare const Pivot$: unique symbol
type Pivot = typeof Pivot$

interface CoyonedaF<F extends Type1> extends Type1 {
  (): Coyoneda<F, this[0]>
}

export abstract class Coyoneda<F extends Type1, A> {
  [Generic.Type]: Generic1<CoyonedaF<F>, A>

  abstract [Pivot$]: unknown
  protected abstract transformation: (i: this[Pivot]) => A
  protected abstract underlying: Of<F, this[Pivot]>

  constructor() {}

  map<B>(f: (a: A) => B): Coyoneda<F, B> {
    return Coyoneda.from(this.underlying, p => f(this.transformation(p)))
  }

  run(F: IFunctor<F>) {
    return F.map(this.underlying, this.transformation)
  }
}

export namespace Coyoneda {
  export declare const Pivot: typeof Pivot$
}

export namespace Coyoneda {
  class Aux<F extends Type1, A, B> extends Coyoneda<F, A> {
    [Pivot]!: B

    constructor(protected underlying: Of<F, B>, protected transformation: (i: B) => A) {
      super()
    }
  }

  export function liftF<F extends Type1, A>(fa: Of<F, A>): Coyoneda<F, A> {
    return from(fa, x => x)
  }

  export function from<F extends Type1, A, B>(fa: Of<F, A>, f: (a: A) => B) {
    return new Aux(fa, f) as Coyoneda<F, B>
  }
}

interface BoxF extends Type1 {
  (): Box<this[0]>
}

class Box<A> {
  [Generic.Type]: Generic1<BoxF, A>

  constructor(readonly value: A) {}

  map<B>(f: (a: A) => B): Box<B> {
    return new Box(f(this.value))
  }
}

interface IFunctor<F extends Type1> {
  map<A, B>(fa: Of<F, A>, f: (a: A) => B): Of<F, B>
}

function IFunctor<F extends IsFunctor<F>>(): IFunctor<F> {
  return {
    map(fa, f) {
      return fa.map(f)
    }
  }
}

const boxF = Coyoneda.liftF(new Box(2))