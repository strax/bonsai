import { FunctorLaws } from "./laws"
import { Arbitrary, anything } from "fast-check"
import { Const } from "./Const"

function arbConst<A>(arbA: Arbitrary<A>): Arbitrary<Const<A, A>> {
  return arbA.map(_ => new Const(_))
}

describe("Const", () => {
  FunctorLaws.run(Const, arbConst(anything()), anything())
})
