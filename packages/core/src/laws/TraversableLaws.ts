// import { Applicative, fmap, id, pure, ap, Monad, Traversable, Functor } from "@bonsai/core"
// import { Kind1, Fix } from "@bonsai/kinds"
// import { Arbitrary, property, check, func, assert } from "fast-check"
// import { isDeepStrictEqual as eq } from "util"
// import { FunctorLaws } from "./FunctorLaws"
// import { ApplicativeLaws } from "./ApplicativeLaws"

// export namespace TraversableLaws {
//   export function run<T extends Kind1, A>(T: Traversable<T>, arbMA: Arbitrary<Fix<T, A>>, arbA: Arbitrary<A>) {
//     FunctorLaws.run(T, arbMA, arbA)

//     describe("TraversableLawsk", () => {
//       const { traverse, sequence } = Traversable(T)
//       test("(Identity) traverse(Identity, t) === new Identity(t)", () => {
//         assert(property(arbA, arbF, (a, f) => eq(flatMap(pure(a), f), f(a))))
//       })
//       test("(Composition) ", () => {})
//     })
//   }
// }
