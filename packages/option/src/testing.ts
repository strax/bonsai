import Option from "."
import "@bonsai/core/dist/extensions"
import { fmap, pure, Applicative, Identity } from "@bonsai/core"
import { Traversable } from "@bonsai/core/dist/Traversable"
import { Fix, Type1, HasKind1 } from "@bonsai/core/dist/kinds"

fmap([1, 2, 3], String)
function sequence<F extends Traversable<F>, G extends Applicative<G>, A>(fga: Array<Fix<G, A>>): void {
  const T = fga.constructor
  // return T[Traversable.sequence](fga)
}

type FixNested1<F extends HasKind1, T> = T extends Fix<F, infer U> ? Fix<F, U> : never

type Sequence<F extends HasKind1, T> = T extends Fix<infer G, infer A> ? Fix<G, Fix<F, A>> : never

declare function prj<F extends HasKind1, T extends Fix<HasKind1, any>>(ffa: Fix<F, T>): Sequence<F, T>

const x = prj(Option.pure(new Identity(2)))

type z = Fix<ArrayConstructor, Fix<typeof Option, string>>

const z = sequence([Option.pure(1), Option.pure(2), Option.pure(3)])

fmap(pure(Option)(2), String)
