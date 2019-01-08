import { Type1, Kind1, Monad, Functor, Applicative, pure, id, FunctorInstance } from "@bonsai/core"

declare const enum IO$Witness {}

namespace IOFunctor {
  export function map<A, B>(io: IO<A>, f: (a: A) => B): IO<B> {
    return new IO(() => f(io.unsafeRun()))
  }
}

namespace IOApplicative {
  export const functor = IOFunctor

  export function pure<A>(a: A): IO<A> {
    return new IO(() => a)
  }

  export function ap<A, B>(fa: IO<A>, fab: IO<(a: A) => B>): IO<B> {
    return Functor(IO).map(fa, a => fab.unsafeRun()(a))
  }
}

namespace IOMonad {
  export const applicative = IOApplicative

  export function flatMap<A, B>(fa: IO<A>, f: (a: A) => IO<B>): IO<B> {
    return new IO(() => f(fa.unsafeRun()).unsafeRun())
  }
}

export class IO<A> {
  static [Kind1.kind] = (IO as unknown) as IOKind

  static [Functor.instance]: Functor<IOKind> = IOFunctor
  static [Applicative.instance]: Applicative<IOKind> = IOApplicative
  static [Monad.instance]: Monad<IOKind> = IOMonad

  static pure<A>(a: A): IO<A> {
    return Applicative(IO).pure(a)
  }

  [Kind1.kind] = (IO as unknown) as IOKind

  map<B>(f: (a: A) => B): IO<B> {
    return Functor(IO).map(this, f)
  }

  flatMap<B>(f: (a: A) => IO<B>): IO<B> {
    return Monad(IO).flatMap(this, f)
  }

  // #endregion

  constructor(private run: () => A) {}

  unsafeRun(): A {
    return this.run()
  }
}

type IOConstructor = typeof IO

export interface IO<A> extends Type1<IOKind, A> {}

interface IOKind extends Kind1<IO$Witness>, IOConstructor {
  [Kind1.refine]: this extends Type1<IOKind, infer A> ? IO<A> : never
}
