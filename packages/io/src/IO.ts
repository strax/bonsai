import { Type1, Kind1, Monad, Functor, Applicative, pure, id } from "@bonsai/core"

declare const enum IO$Witness {}

export class IO<A> {
  static [Kind1.kind]: IO$λ

  static pure<A>(a: A): IO<A> {
    return new IO(() => a)
  }

  static [Applicative.pure]<A>(a: A): IO<A> {
    return this.pure(a)
  }

  map<B>(f: (a: A) => B): IO<B> {
    return new IO(() => f(this.run()))
  }

  ap<B>(fab: IO<(a: A) => B>): IO<B> {
    return this.map(a => fab.unsafeRun()(a))
  }

  flatMap<B>(f: (a: A) => IO<B>): IO<B> {
    return new IO(() => f(this.unsafeRun()).unsafeRun())
  }

  flatten<A>(this: IO<IO<A>>): IO<A> {
    return this.flatMap(id)
  }

  // #endregion

  constructor(private run: () => A) {}

  unsafeRun(): A {
    return this.run()
  }

  static [Functor.map]<A, B>(io: IO<A>, f: (a: A) => B) {
    return io.map(f)
  }

  static [Applicative.ap]<A, B>(io: IO<A>, fab: IO<(a: A) => B>) {
    return io.ap(fab)
  }

  static [Monad.flatMap]<A, B>(io: IO<A>, f: (a: A) => IO<B>) {
    return io.flatMap(f)
  }
}

type IOConstructor = typeof IO

export interface IO<A> extends Type1<IOConstructor, A> {}

interface IO$λ extends Kind1<IO$Witness> {
  [Kind1.refine]: this extends Type1<IOConstructor, infer A> ? IO<A> : never
}
