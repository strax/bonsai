import { Kind1, Type1, Fix, Kind2, Refine1 } from "@bonsai/kinds"
import { Functor } from "./Functor"
import { Identity, Identity$kind } from "./Identity"

declare const enum Lift$witness {}
interface Lift<F extends Kind1, G extends Kind1> extends Kind1<F[Kind1.witness]> {
  [Kind1.refine]: [this] extends [Type1<Lift<F, G>, infer A>] ? Fix<F, Fix<G, A>> : never
}

// Type1<Lift<F, G>, string> === Type1<F, Type1<G, string>>

type fixed = Fix<Lift<Identity$kind, Identity$kind>, string>

declare function composeFunctors<F extends Kind1, G extends Kind1>(F: Functor<F>, G: Functor<G>): Functor<Lift<F, G>>

const FF = composeFunctors(Identity, Identity)

declare const iid: Identity<Identity<string>>
Functor(FF).map(iid, String)
