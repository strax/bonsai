import { Functor, fmap } from "@bonsai/core"
import { State } from "./State"

declare const m: State<string, number>

const m2 = fmap(State, m, (x: number) => x * 2)
