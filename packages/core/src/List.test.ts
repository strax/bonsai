import { List } from "./List"
import { MonadLaws } from "./laws"
import { Arbitrary, anything, array } from "fast-check/*"

function arbList<A = any>(arbA: Arbitrary<A> = anything()): Arbitrary<List<A>> {
  return array(arbA).map(_ => new List(_))
}

describe("List", () => {
  MonadLaws.run(List, arbList(), anything())
})
