import Option from "."
import "@bonsai/core/dist/extensions"
import { fmap, pure, Applicative, Identity, Functor } from "@bonsai/core"
import { Traversable } from "@bonsai/core"

Functor(Option).map(Option.pure(2), x => x)
