import { Generic, Generic1, Kind1, TypeFamily } from "tshkt"

interface IdentityF extends TypeFamily<Kind1> {
  (): Identity<this[0]>
}

export class Identity<A> {
  [Generic.Type]!: Generic1<IdentityF, A>;
  ["constructor"]!: typeof Identity

  static of<A>(a: A): Identity<A> {
    return new Identity(a)
  }

  constructor(private value: A) {}

  get(): A {
    return this.value
  }

  map<B>(f: (a: A) => B): Identity<B> {
    return new Identity(f(this.get()))
  }

  ap<B>(fab: Identity<(a: A) => B>): Identity<B> {
    return new Identity(fab.get()(this.get()))
  }
}
