import Option from "."
import { MonadLaws } from "@bonsai/core"
import { oneof, constant, Arbitrary, anything } from "fast-check"

const arbOption = <A>(arbA: Arbitrary<A>): Arbitrary<Option<A>> =>
  oneof(arbA.map(Option.of), constant(Option.empty()))

describe("Option", () => {
  MonadLaws.run(Option, arbOption(anything()), anything())
})
