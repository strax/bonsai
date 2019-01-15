import { Kind1, Fix } from "@bonsai/kinds"
import { Arbitrary, property, func, assert } from "fast-check"
import { isDeepStrictEqual as eq } from "util"
import { ApplicativeLaws } from "./ApplicativeLaws"
import { Monad } from "../Monad"

export namespace MonadLaws {
  export function run<M extends Kind1, A>(M: Monad<M>, arbMA: Arbitrary<Fix<M, A>>, arbA: Arbitrary<A>) {
    ApplicativeLaws.run(M, arbMA, arbA)

    describe("MonadLaws", () => {
      const { pure, flatMap } = Monad(M)
      const arbF = func<[A], Fix<M, A>>(arbMA)
      test("(Left identity) flatMap(pure(a), f) === f(a)", () => {
        assert(property(arbA, arbF, (a, f) => eq(flatMap(pure(a), f), f(a))))
      })
      test("(Right identity) flatMap(m, pure) === m", () => {
        assert(property(arbMA, m => eq(flatMap(m, pure), m)))
      })
      test("(Associativity) flatMap(flatMap(m, f), g) === flatMap(m, a => flatMap(f(a), g))", () => {
        assert(
          property(arbMA, arbF, arbF, (m, f, g) => eq(flatMap(flatMap(m, f), g), flatMap(m, a => flatMap(f(a), g))))
        )
      })
    })
  }
}
