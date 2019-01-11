import { Functor, id } from "@bonsai/core"
import { Kind1, Fix } from "@bonsai/kinds"
import { Arbitrary, property, check, func, assert } from "fast-check"
import { isDeepStrictEqual as eq } from "util"

export namespace FunctorLaws {
  export function run<F extends Kind1, A>(F: Functor<F>, arbFA: Arbitrary<Fix<F, A>>, arbA: Arbitrary<A>) {
    describe("FunctorLaws", () => {
      const { map } = Functor(F)
      test("map(x, id) === x", () => {
        assert(property(arbFA, fa => eq(map(fa, id), fa)))
      })
      test("map(x, g ∘ f) === map(map(x, f), g)", () => {
        const arbF = func<[A], A>(arbA)
        assert(property(arbFA, arbF, arbF, (fa, f, g) => eq(map(fa, a => g(f(a))), map(map(fa, f), g))))
      })
    })
  }
}
