import { Type1, Kind } from "./kinds"
import { Monad } from "./Monad"
import { Functor } from "./Functor"
import { Applicative } from "./Applicative"
import { id } from "./utils"

declare const enum IO$Witness {}

export class IO<A> implements Monad<IO$Kind> {
  static [Applicative.pure]<A>(a: A): IO<A> {
    return new IO(() => a)
  }

  // #region Aliases
  static readonly pure = IO[Applicative.pure]

  readonly map = this[Functor.map]
  readonly ap = this[Applicative.ap]
  readonly flatMap = this[Monad.flatMap]
  readonly flatten = this[Monad.flatten]
  // #endregion

  constructor(private run: () => A) {}

  unsafeRun(): A {
    return this.run()
  }

  [Functor.map]<A, B>(this: IO<A>, f: (a: A) => B) {
    return new IO(() => f(this.run()))
  }

  [Applicative.ap]<A, B>(this: IO<A>, fab: IO<(a: A) => B>) {
    return this[Functor.map](a => fab.unsafeRun()(a))
  }

  [Monad.flatMap]<A, B>(this: IO<A>, f: (a: A) => IO<B>) {
    return new IO(() => f(this.unsafeRun()).unsafeRun())
  }

  [Monad.flatten]<A>(this: IO<IO<A>>): IO<A> {
    return this[Monad.flatMap](id)
  }
}

export interface IO<A> extends Type1<IO$Kind, A> {
  constructor: typeof IO
}

interface IO$Kind extends Kind<IO$Witness> {
  [Kind.refine]: [this] extends [Type1<IO$Kind, infer A>] ? IO<A> : never
}

const ix = new IO(() => 2)[Monad.flatMap](x => new IO(() => console.log(x)))
