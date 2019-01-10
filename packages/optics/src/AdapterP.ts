import { IsProfunctor, Profunctor } from "./Profunctor"
import { Fix2 } from "@bonsai/core"

type NotString = ~string

const x: NotString = "foo"

export type AdapterP<S, T, A, B> = <P extends IsProfunctor>(pab: Fix2<P, A, B>) => Fix2<P, S, T>
