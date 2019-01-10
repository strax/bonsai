import { Kind2, Fix2 } from "@bonsai/core"
import { Profunctor } from "./Profunctor"
import { HasKind2 } from "@bonsai/core/dist/kinds"

export interface Strong<P extends Kind2> {
  profunctor: Profunctor<P>

  first<A, B, C>(pab: Fix2<P, A, B>): Fix2<P, [A, C], [B, C]>
  second<A, B, C>(pab: Fix2<P, A, B>): Fix2<P, [C, A], [C, B]>
}

export interface StrongInstance<P extends Kind2> {
  [Strong.instance]: Strong<P>
}

export interface IsStrong extends Kind2 {
  [Strong.instance]: Strong<this>
}

export function Strong<F extends IsStrong>(F: HasKind2<F>): Strong<F> {
  return F[Kind2.kind][Strong.instance]
}

export namespace Strong {
  export const instance = Symbol("Strong.instance")
}
