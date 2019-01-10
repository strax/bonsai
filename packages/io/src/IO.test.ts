import { Monad, flatMap, flatten } from "@bonsai/core"
import { IO } from "./IO"

declare const io: IO<string, IO<string, number>>

const test1 = Monad(IO).flatMap(io, x => IO.pure(2))
const test2 = flatMap(IO, io, x => IO.pure(2))
// FIXME: Incorrect inference
const test3 = flatten(IO, IO.pure(IO.pure(2)))
const test4 = io.flatten()
