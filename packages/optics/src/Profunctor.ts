import { Kind2, Fix2 } from "@bonsai/core"
import { HasKind2 } from "@bonsai/core/dist/kinds"

export interface Profunctor<P extends Kind2> {
  dimap<A1, B1, A2, B2>(pab: Fix2<P, A1, B1>, f: (a: A2) => A1, g: (b: B1) => B2): Fix2<P, A2, B2>
}

export interface ProfunctorInstance<P extends Kind2> {
  [Profunctor.instance]: Profunctor<P>
}

export interface IsProfunctor extends Kind2 {
  [Profunctor.instance]: Profunctor<this>
}

export function Profunctor<F extends IsProfunctor>(F: HasKind2<F>): Profunctor<F> {
  return F[Kind2.kind][Profunctor.instance]
}

export namespace Profunctor {
  export const instance = Symbol("Profunctor.instance")

  export function dimap<P extends IsProfunctor, A1, A2, B1, B2>(
    pab: Fix2<P, A1, B1>,
    f: (a2: A2) => A1,
    g: (b1: B1) => B2
  ): Fix2<P, A2, B2> {
    return Profunctor<P>(pab).dimap(pab, f, g)
  }
}
