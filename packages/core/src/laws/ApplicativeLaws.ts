import { IsApplicative } from "../Applicative"
import { Arbitrary, property, func, assert } from "fast-check"
import { isDeepStrictEqual as eq } from "util"
import { FunctorLaws } from "./FunctorLaws"
import { Of } from "tshkt";
import { Pointed } from "../Pointed";

export namespace ApplicativeLaws {
  export function run<F extends IsApplicative<F>, A>(F: Pointed<F>, arbFA: Arbitrary<Of<F, A>>, arbA: Arbitrary<A>) {
    FunctorLaws.run(arbFA, arbA)

    describe("ApplicativeLaws", () => {
      const arbF = func<[A], A>(arbA)
      test("Identity: ap(pure(id), a) === a", () => {
        assert(property(arbFA, fa => eq(fa.ap(F.of((a: A) => a)), fa)))
      })
      test("Homomorphism: ap(pure(a), pure(f)) === pure(f(a))", () => {
        assert(property(arbF, arbA, (f, a) => eq(F.of(a).ap(F.of(f)), F.of(f(a)))))
      })
      test("Interchange: ap(pure(a), u) === ap(u, pure(f => f(a)))", () => {
        const arbU = arbF.map(F.of)
        assert(property(arbA, arbU, (a, u) => eq(F.of(a).ap(u), u.ap(F.of(f => f(a))))))
      })
      test("Composition: ap(w, ap(v, ap(u, pure(∘))) === ap(ap(w, v), u)", () => {
        const arbFF = arbF.map(F.of)
        const compose2 = (f: (b: A) => A) => (g: (a: A) => A) => (a: A): A => f(g(a))

        assert(
          property(arbFA, arbFF, arbFF, (a, v, u) => {
            return eq(a.ap(v.ap(u.ap(F.of(compose2)))), a.ap(v).ap(u))
          })
        )
      })
    })
  }
}
