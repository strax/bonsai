import { Identity } from "./Identity"
import { fmap, Functor } from "./Functor"
import { pure } from "./Applicative"
import { Fix, Kind1 } from "@bonsai/kinds"

function mapTwiceToString<F extends Kind1>(F: Functor<F>, fa: Fix<F, number>): Fix<F, string> {
  return fmap(F, fmap(F, fa, String), String)
}

declare const fa: Identity<number>

mapTwiceToString(Identity, new Identity(2))

pure(Identity)(2)
