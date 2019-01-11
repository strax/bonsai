import "./array"
import { MonadLaws } from "@bonsai/laws"
import { array, anything } from "fast-check"

describe("Array", () => {
  MonadLaws.run(Array, array(anything()), anything())
})
