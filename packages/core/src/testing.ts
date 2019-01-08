import { Identity } from "./Identity"
import { fmap, IsFunctor } from "./Functor"
import { Applicative } from "./Applicative"
import { Fix } from "./kinds"

const ida = new Identity(2)
const idc = fmap(ida, x => x)

function mapTwiceToString<F extends IsFunctor>(fa: Fix<F, number>): Fix<F, string> {
  return fmap(fmap(fa, String), String)
}

mapTwiceToString(new Identity(2))

Applicative(Identity).pure(2)
