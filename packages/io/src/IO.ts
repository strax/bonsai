import { Monad, Functor, MonadSyntax } from "@bonsai/core"
import { Type1, Kind1, Kind } from "@bonsai/kinds"

export class IO<A> extends MonadSyntax<IO$kind> {
  constructor(private run: () => A) {
    super(IO)
  }

  unsafeRun(): A {
    return this.run()
  }
}

export namespace IO {
  export function map<A, B>(io: IO<A>, f: (a: A) => B): IO<B> {
    return new IO(() => f(io.unsafeRun()))
  }

  export function pure<A>(a: A): IO<A> {
    return new IO(() => a)
  }

  export function ap<A, B>(fa: IO<A>, fab: IO<(a: A) => B>): IO<B> {
    return Functor(IO).map(fa, a => fab.unsafeRun()(a))
  }

  export function flatMap<A, B>(fa: IO<A>, f: (a: A) => IO<B>): IO<B> {
    return new IO(() => f(fa.unsafeRun()).unsafeRun())
  }
}

declare const enum IO$witness {}
interface IO$kind extends Kind1<IO$witness> {
  [Kind.refine]: this extends Type1<IO$kind, infer A> ? IO<A> : never
}
export interface IO<A> extends Type1<IO$kind, A> {}
