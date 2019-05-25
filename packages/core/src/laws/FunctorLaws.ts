import { Arbitrary, assert, func, property } from "fast-check"
import { Of } from "tshkt"
import { isDeepStrictEqual as eq } from "util"
import { IsFunctor } from "../Functor"
import { id } from "../utils"

export namespace FunctorLaws {
  export function run<F extends IsFunctor<F>, A>(arbFA: Arbitrary<Of<F, A>>, arbA: Arbitrary<A>) {
    describe("FunctorLaws", () => {
      test("map(x, id) === x", () => {
        assert(property(arbFA, fa => eq(fa.map(id), fa)))
      })
      test("map(x, g ∘ f) === map(map(x, f), g)", () => {
        const arbF = func<[A], A>(arbA)
        assert(property(arbFA, arbF, arbF, (fa, f, g) => eq(fa.map(a => g(f(a))), fa.map(f).map(g))))
      })
    })
  }
}
