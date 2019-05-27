import { TypeFamily, Kind1, Generic, Generic1 } from "tshkt";

interface IOF extends TypeFamily<Kind1> {
  (): IO<this[0]>
}

export class IO<A> {
  [Generic.Type]!: Generic1<IOF, A>
  ["constructor"]!: typeof IO

  static of<A>(a: A): IO<A> {
    return new IO(() => a)
  }

  constructor(private run: () => A) {
  }

  unsafeRun(): A {
    return this.run()
  }

  map<B>(f: (a: A) => B): IO<B> {
    return new IO(() => f(this.unsafeRun()))
  }

  ap<B>(fab: IO<(a: A) => B>): IO<B> {
    return this.map(a => fab.unsafeRun()(a))
  }

  flatMap<B>(f: (a: A) => IO<B>): IO<B> {
    return new IO(() => f(this.unsafeRun()).unsafeRun())
  }
}
