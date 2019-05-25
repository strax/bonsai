import { FunctorLaws } from "./laws"
import { Arbitrary, anything } from "fast-check"
import { Const } from "./Const"

function arbConst<A>(arbA: Arbitrary<A>): Arbitrary<Const<A, any>> {
  return arbA.map(_ => new Const(_))
}

describe("Const", () => {
  FunctorLaws.run(arbConst(anything()), anything())
})
