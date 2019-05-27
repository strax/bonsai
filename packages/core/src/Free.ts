import { Type1 } from "./kinds";
import { Generic, Generic1, Of } from "tshkt";
import { Monad } from "./Monad";
import { IsFunctor } from "./Functor";

interface FreeF<F extends Type1> extends Type1 {
  (): Free<F, this[0]>
}

abstract class FreeC<F extends IsFunctor<F>, A> implements Monad<FreeF<F>, A> {
  [Generic.Type]: Generic1<FreeF<F>, A>
  ["constructor"]: typeof Free

  protected constructor() {}

  map<B>(f: (a: A) => B): Free<F, B> {
    return this.flatMap(a => new Pure(f(a)))
  }

  ap<B>(fab: Free<F, (a: A) => B>): Free<F, B> {
    return fab.flatMap(f => this.map(f))
  }

  abstract flatMap<B>(f: (a: A) => Free<F, B>): Free<F, B>
}

export interface Free<F extends IsFunctor<F>, A> extends FreeC<F, A> {
}

export namespace Free {
  export function of<F extends IsFunctor<F>, A>(a: A): Free<F, A> {
    return new Pure(a)
  }

  export function liftF<F extends IsFunctor<F>, A>(fa: Of<F, A>): Free<F, A> {
    return new Suspend(fa.map(_ => new Pure(_)))
  }
}

class Pure<F extends IsFunctor<F>, A> extends FreeC<F, A> {
  constructor(readonly value: A) {
    super()
  }

  flatMap<B>(f: (a: A) => Free<F, B>): Free<F, B> {
    return f(this.value)
  }
}

class Suspend<F extends IsFunctor<F>, A> extends FreeC<F, A> {
  constructor(readonly value: Of<F, Free<F, A>>) {
    super()
  }

  flatMap<B>(f: (a: A) => Free<F, B>): Free<F, B> {
    return new Suspend(this.value.map(fa => fa.flatMap(a => f(a))))
  }
}