import { Arbitrary, property, check, func, assert } from "fast-check"
import { isDeepStrictEqual as eq } from "util"
import { FunctorLaws } from "./FunctorLaws"
import { IsTraversable } from "../Traversable";
import { Of } from "tshkt";
import { Identity } from "../Identity";

export namespace TraversableLaws {
  export function run<T extends IsTraversable<T>, A>(arbTA: Arbitrary<Of<T, A>>, arbA: Arbitrary<A>) {
    FunctorLaws.run(arbTA, arbA)

    describe("TraversableLawsk", () => {
      test("(Identity) traverse(Identity.of, t) === Identity.of(t)", () => {
        assert(property(arbTA, t => eq(t.traverse(Identity.of), Identity.of(t))))
      })

      // TODO: Rest
    })
  }
}
