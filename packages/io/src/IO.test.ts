import { MonadLaws } from "@bonsai/core"
import { IO } from "./IO"
import { anything } from "fast-check"

describe("IO", () => {
  MonadLaws.run(IO, anything().map(IO.pure), anything())
})
