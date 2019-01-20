import { Kind1, Type1, Ap, Kind, λ, _ } from "@bonsai/kinds"
import { Functor } from "./Functor"
import { Identity, Identity$kind } from "./Identity"
import { Const } from "./Const"

declare const enum Compose$witness {}
interface Compose<F extends Kind1, G extends Kind1> extends Kind1<[Compose$witness, F, G]> {
  [Kind.refine]: this extends Type1<Compose<F, G>, infer A> ? Ap<F, Ap<G, A>> : never
}

// Type1<Lift<F, G>, string> === Type1<F, Type1<G, string>>

// type fixed = Ap<Lift<Identity$kind, Identity$kind>, string>

declare function composeFunctors<F extends Kind1, G extends Kind1>(F: Functor<F>, G: Functor<G>): Functor<Compose<F, G>>

declare const ConstFunctor: Functor<λ<Const<string, _>>>

const FF = composeFunctors(Identity, ConstFunctor)

declare const iid: Identity<Const<string, number>>
Functor(FF).map(iid, x => true)
