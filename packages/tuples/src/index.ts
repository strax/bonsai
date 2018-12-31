function Tuple<T extends Array<string | number | boolean | symbol | null | undefined | object>>(...args: T): T {
  return args
}

type Tuple = Array<any> | []

namespace Tuple {
  export type NonEmpty = [any, ...any[]]
  /**
   * @alias NonEmpty
   */
  export type NE = NonEmpty

  export type Length<T extends Tuple> = T["length"]

  export type Values<T extends Tuple> = T[number]

  export type Head<T extends NonEmpty> = T[0]
  export type Last<T extends NonEmpty> = T[Length<Tail<T>>]

  export type Tail<T extends Tuple> = ((...t: T) => void) extends ((h: any, ...u: infer U) => void) ? U : never
  export type Init<T extends Tuple, Aux = Tail<T>> = { [K in keyof Aux]: K extends keyof T ? T[K] : Aux[K] }

  export type Prepend<A, T extends Tuple> = ((a: A, ...t: T) => void) extends ((...u: infer U) => void) ? U : never

  type RotateLeft<T extends NonEmpty, Aux = Tail<T>> = { [K in keyof T]: K extends keyof Aux ? Aux[K] : T[0] }
  // type RotateRight<T extends NonEmptyTuple> = Prepend<Last<T>, Extract<Init<T>, Tuple>>

  export type Zip<T extends Tuple, U extends Tuple> = { [K in keyof T]: K extends keyof U ? [T[K], U[K]] : [T[K]] }

  export type Append<T extends Tuple, A> = RotateLeft<Prepend<A, T>>
}

export default Tuple
