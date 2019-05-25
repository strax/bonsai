import { ApplicativeLaws, FunctorLaws, MonadLaws } from "./laws"
import { Identity } from "./Identity"
import { Arbitrary, anything } from "fast-check"

function arbIdentity<A>(arbA: Arbitrary<A>): Arbitrary<Identity<A>> {
  return arbA.map(_ => new Identity(_))
}

describe("Identity", () => {
  FunctorLaws.run(arbIdentity(anything()), anything())
  ApplicativeLaws.run(Identity, arbIdentity(anything()), anything())
  MonadLaws.run(Identity, arbIdentity(anything()), anything())
})
