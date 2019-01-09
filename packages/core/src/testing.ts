import { Identity } from "./Identity"
import { fmap, IsFunctor, Functor } from "./Functor"
import { Applicative } from "./Applicative"
import { Fix } from "./Kind1"
import { Const } from "./Const"
import { string } from "fast-check/*"

const ida = new Identity(2)
const idc = fmap(ida, x => x)

type test = ~("a" | "b")
type Exclude<T, U> = T & ~U

type z = {a: 2, b: string} & ~{a: 2}

type zz = ~never

const x: test = "c"

function mapTwiceToString<F extends IsFunctor>(fa: Fix<F, number>): Fix<F, string> {
  return fmap(fmap(fa, String), String)
}

declare const fa: Identity<number>

fmap(fa, x => x)

mapTwiceToString(new Identity(2))

Applicative(Identity).pure(2)
