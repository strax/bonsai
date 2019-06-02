import { TypeFamily, Kind1, Kind2, Of2, Of } from "tshkt"

export interface Id extends TypeFamily<Kind1> {
  (): this[0]
}

interface λ<T extends TypeFamily<Kind2>, A> extends TypeFamily<Kind1> {
  (): Of2<T, A, this[0]>
}

export interface HCurry2<T extends TypeFamily<Kind2>> extends TypeFamily<Kind1> {
  (): λ<T, this[0]>
}

type Curry2<T extends TypeFamily<Kind2>, A> = λ<T, A>


export interface HConst extends TypeFamily<Kind2> {
  (): this[0]
}

export type Const<A> = Curry2<HConst, A>

export interface Ap<A> extends TypeFamily<Kind1> {
  (): Of<this[0], A>
}

export interface Compose<F extends TypeFamily<Kind1>, G extends TypeFamily<Kind1>> extends TypeFamily<Kind1> {
  (): Of<F, Of<G, this[0]>>
}
