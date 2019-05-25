import { Arbitrary, property, func, assert } from "fast-check"
import { isDeepStrictEqual as eq } from "util"
import { ApplicativeLaws } from "./ApplicativeLaws"
import { Monad, IsMonad } from "../Monad"
import { Pointed } from "../Pointed";
import { Of } from "tshkt";

export namespace MonadLaws {
  export function run<M extends IsMonad<M>, A>(M: Pointed<M>, arbMA: Arbitrary<Of<M, A>>, arbA: Arbitrary<A>) {
    ApplicativeLaws.run(M, arbMA, arbA)

    describe("MonadLaws", () => {
      const arbF = func<[A], Of<M, A>>(arbMA)
      test("(Left identity) flatMap(pure(a), f) === f(a)", () => {
        assert(property(arbA, arbF, (a, f) => eq(M.of(a).flatMap(f), f(a))))
      })
      test("(Right identity) flatMap(m, pure) === m", () => {
        assert(property(arbMA, m => eq(m.flatMap(M.of), m)))
      })
      test("(Associativity) flatMap(flatMap(m, f), g) === flatMap(m, a => flatMap(f(a), g))", () => {
        assert(
          property(arbMA, arbF, arbF, (m, f, g) => eq(m.flatMap(f).flatMap(g), m.flatMap(a => f(a).flatMap(g))))
        )
      })
    })
  }
}
