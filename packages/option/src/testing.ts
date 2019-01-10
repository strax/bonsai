import Option from "."
import "@bonsai/ext"
import { Functor } from "@bonsai/core"

Functor(Option).map(Option.pure(2), x => x)
