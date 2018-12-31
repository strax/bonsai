import { PLens, _id } from "./PLens"
import { Optic } from "./Optic"

declare const enum PIsoKind {}

const compose2 = <A extends [any], B, C>(f: (...args: [B]) => C, g: (...args: A) => B) => (...args: A): C =>
  f(g(...args))

const gf = compose2((x: number) => x * 2, (input: string) => parseInt(input, 10))

export class PIso<S, T, A, B> {
  [Symbol.species]: PIsoKind

  constructor(readonly from: (s: S) => A, readonly to: (b: B) => T) {}

  compose<A2, B2 = A2>(other: PIso<A, B, A2, B2>): PIso<A, B, A2, B2>
  compose<A2, B2 = A2>(other: PLens<A, B, A2, B2>): PLens<S, T, A2, B2>
  compose<A2, B2 = A2>(other: PIso<A, B, A2, B2>): typeof other {
    if (other instanceof PIso) {
      return new PIso(compose2(other.from, this.from), compose2(this.to, other.to))
    } else {
      return new PLens(compose2(other.get, this.from), (b2, s) => this.to(other.set(b2, this.from(s))))
    }
  }
}

Iso._id<string>().compose(_id())

export type Iso<S, A> = PIso<S, S, A, A>

const id = <A>(a: A): A => a

export namespace Iso {
  export function _id<A>(): Iso<A, A> {
    return new PIso(id, id)
  }
}
