import { Arbitrary, property, assert, tuple, anything } from "fast-check"
import { PLens, Lens, _1, _2, _id } from "./PLens"
import { isDeepStrictEqual as eq } from "util"
import { Property } from "fast-check/lib/check/property/Property"
import { Iso, PIso } from "./PIso"
import { Getter } from "./Getter"

namespace LensLaws {
  type Law = <S, A>(p: Lens<S, A>, arbS: Arbitrary<S>, arbA: Arbitrary<A>) => Property<any>

  export function run<S, A>(p: Lens<S, A>, arbS: Arbitrary<S>, arbA: Arbitrary<A>) {
    test("set(get(s), s) === s", () => assert(setGet(p, arbS, arbA)))
    test("get(set(a, s)) === a", () => assert(getSet(p, arbS, arbA)))
    test("set(a', set(a, s)) = a'", () => assert(setSet(p, arbS, arbA)))
  }

  export const setGet: Law = (p, arbS, arbA) => property(arbS, arbA, (s, a) => eq(p.set(p.get(s), s), s))

  export const getSet: Law = (p, arbS, arbA) => property(arbS, arbA, (s, a) => eq(p.get(p.set(a, s)), a))

  export const setSet: Law = (p, arbS, arbA) =>
    property(arbS, arbA, arbA, (s, a0, a1) => eq(p.set(a1, p.set(a0, s)), p.set(a1, s)))
}

describe("Built-in Lenses", () => {
  describe("_id", () => {
    LensLaws.run(_id(), anything(), anything())
  })

  describe("_1", () => {
    LensLaws.run(_1(), tuple(anything(), anything()), anything())
  })

  describe("_2", () => {
    LensLaws.run(_2(), tuple(anything(), anything()), anything())
  })
})
declare const getter: <A>() => Getter<A, A>
declare const getterId: <A>() => Getter<A, A>

declare const compos: Lens<{ a: true }, boolean>["compose"]
const d = compos(getter())
d.get({ a: true })

describe("Lens composition", () => {
  type NestedTuple = [string, [number, boolean]]
  test("with a Lens", () => {
    const _nested = _id<NestedTuple>()
    const z = _nested.compose(_2())
    const x = z.get(["foo", [2, true]])
  })

  test("with an Iso", () => {
    const x = _id<NestedTuple>().compose
    x(Iso._id())
    const gg = _id<NestedTuple>().compose(Iso._id())
  })
}
