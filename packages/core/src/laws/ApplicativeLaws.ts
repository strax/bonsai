import { Applicative } from "../Applicative"
import { id } from "../utils"
import { Kind1, Ap } from "@bonsai/kinds"
import { Arbitrary, property, func, assert } from "fast-check"
import { isDeepStrictEqual as eq } from "util"
import { FunctorLaws } from "./FunctorLaws"

export namespace ApplicativeLaws {
  export function run<F extends Kind1, A>(F: Applicative<F>, arbFA: Arbitrary<Ap<F, A>>, arbA: Arbitrary<A>) {
    FunctorLaws.run(F, arbFA, arbA)

    describe("ApplicativeLaws", () => {
      const { ap, pure } = Applicative(F)
      const arbF = func<[A], A>(arbA)
      test("Identity: ap(pure(id), a) === a", () => {
        assert(property(arbFA, fa => eq(ap(fa, pure(id as (a: A) => A)), fa)))
      })
      test("Homomorphism: ap(pure(a), pure(f)) === pure(f(a))", () => {
        assert(property(arbF, arbA, (f, a) => eq(ap(pure(a), pure(f)), pure(f(a)))))
      })
      test("Interchange: ap(pure(a), u) === ap(u, pure(f => f(a)))", () => {
        const arbU = arbF.map(pure)
        assert(property(arbA, arbU, (a, u) => eq(ap(pure(a), u), ap(u, pure<(f: (a: A) => A) => A>(f => f(a))))))
      })
      test("Composition: ap(w, ap(v, ap(u, pure(∘))) === ap(ap(w, v), u)", () => {
        const arbFF = arbF.map(pure)
        const compose2 = (f: (b: A) => A) => (g: (a: A) => A) => (a: A): A => f(g(a))

        assert(
          property(arbFA, arbFF, arbFF, (a, v, u) => {
            eq(ap(a, ap(v, ap(u, pure(compose2)))), ap(ap(a, v), u))
          })
        )
      })
    })
  }
}
