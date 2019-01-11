import { ApplicativeLaws } from "@bonsai/laws"
import { Identity } from "./Identity"
import { Arbitrary, anything } from "fast-check"

function arbIdentity<A>(arbA: Arbitrary<A>): Arbitrary<Identity<A>> {
  return arbA.map(_ => new Identity(_))
}

describe("Identity", () => {
  ApplicativeLaws.run(Identity, arbIdentity(anything()), anything())
})
