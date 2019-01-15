import "./array"
import { MonadLaws } from "@bonsai/core"
import { array, anything } from "fast-check"

describe("Array", () => {
  MonadLaws.run(Array, array(anything()), anything())
})
