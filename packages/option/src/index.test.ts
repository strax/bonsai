import Option from "."
import { MonadLaws } from "@bonsai/laws"
import { oneof, constant, Arbitrary, anything } from "fast-check"

const arbOption = <A>(arbA: Arbitrary<A>): Arbitrary<Option<A>> =>
  oneof(arbA.map(Option.pure), constant(Option.empty()))

describe("Option", () => {
  MonadLaws.run(Option, arbOption(anything()), anything())
})
