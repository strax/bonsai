import { Type1, Kind } from "./kinds"
import { Monad } from "./Monad"
import { Functor } from "./Functor"
import { Applicative } from "./Applicative"
import { id } from "./utils"

declare const enum IO$Witness {}

export class IO<A> implements Monad<IO$Kind, A> {
  static [Applicative.pure]<A>(a: A): IO<A> {
    return new IO(() => a)
  }

  constructor(private effect: () => A) {}

  unsafePerform(): A {
    return this.effect()
  }

  [Functor.map]<B>(f: (a: A) => B) {
    return new IO(() => f(this.effect()))
  }

  [Applicative.ap]<B>(fab: IO<(a: A) => B>) {
    return this[Functor.map](a => fab.unsafePerform()(a))
  }

  [Monad.flatMap]<B>(f: (a: A) => IO<B>) {
    return new IO(() => f(this.unsafePerform()).unsafePerform())
  }

  [Monad.flatten]<A>(this: IO<IO<A>>): IO<A> {
    return this[Monad.flatMap](id)
  }
}

export interface IO<A> extends Type1<IO$Kind, A> {
  constructor: typeof IO
}

interface IO$Kind extends Kind<IO$Witness> {
  [Kind.refine]: this extends Type1<IO$Kind, infer A> ? IO<A> : never
}

const ix = new IO(() => 2)[Monad.flatMap](x => new IO(() => console.log(x)))
