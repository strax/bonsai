import { FunctorLaws } from "./laws"
import { Arbitrary, anything } from "fast-check"
import { Const } from "./Const"
import { λ, _, Ap } from "@bonsai/kinds"
import { Functor } from "./Functor"

function arbConst<A>(arbA: Arbitrary<A>): Arbitrary<Const<A, A>> {
  return arbA.map(_ => new Const(_))
}

declare const ConstFunctor: Functor<λ<Const<unknown, _>>>

describe("Const", () => {
  FunctorLaws.run(ConstFunctor, arbConst(anything()), anything())
})
