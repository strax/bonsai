import { Function2 } from "./functions"
import { Forget } from "./Forget"
import { PLens } from "./Lens"
import { Strong, IsStrong } from "./Strong"
import { Fix2, id } from "@bonsai/core"

const tuple = [1, 2] as [number, number]

function pi1<A, B, C>(): PLens<[A, C], [B, C], A, B> {
  return <P extends IsStrong>(pab: Fix2<P, A, B>) => Strong<P>(pab).first(pab)
}

function view<S, T, A, B>(h: PLens<S, T, A, B>, s: S): A {
  return h(new Forget<A, A, B>(id)).runForget(s)
}

function compose<S, T, A1, B1, A2, B2>(h1: PLens<S, T, A1, B1>, h2: PLens<A1, B1, A2, B2>): PLens<S, T, A2, B2> {
  return <P extends IsStrong>(pab: Fix2<P, A2, B2>) => h1(h2(pab))
}

const h = compose(
  pi1<[string, number], [string, number], string>(),
  pi1()
)

console.log(view(h, [["foo", 2], "foo"]))

// Profunctor(Function2((a: string) => a))

// Profunctor(new Forget((x: string) => x))
