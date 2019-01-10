import { Type1, Kind1, Fix, Kind2, Type2, Fix2 } from "@bonsai/kinds"
import { Identity } from "./Identity"
import { Const } from "./Const"
import { Functor, fmap } from "./Functor"
import { constant } from "./utils"
import { pure, ap, Applicative } from "./Applicative"
import { pre } from "fast-check/*"

declare function inj<F extends Kind1, A>(fa: Type1<F, A>): Type1<F, A>
declare function prj<F extends Kind1, A>(fa: Type1<F, A>): Fix<F, A>

declare function fix<F extends Kind1, A>(fa: Fix<F, A>): Fix<F, A>

declare function inj2<F extends Kind2, A, B>(fa: Type2<F, A, B>): Type2<F, A, B>
declare function prj2<F extends Kind2, A, B>(fa: Type2<F, A, B>): Fix2<F, A, B>
declare function fix2<F extends Kind2, A, B>(fa: Fix2<F, A, B>): Fix2<F, A, B>

// #region Moving between Type1 and concrete types
// Identity :: * -> *
const test1 = prj(inj(new Identity("foo")))
const test2 = fix(new Identity("foo"))
// The inferred kind Kind2$λ<ConstKind, A> encodes Const a :: * -> *
const test3 = prj(inj(new Const<number, string>(2)))
const test4 = fix(new Const<number, string>(2))

// Const :: * -> * -> *
const test5 = prj2(inj2(new Const<number, string>(2)))
const test6 = fix2(new Const<number, string>(2))
// #endregion

// #region Inference for typeclasses

declare const idF: Identity<string>
declare const constF: Const<string, number>

const test7 = Identity.map(idF, constant(2))
const test8 = fmap(Identity, idF, constant(2))
const test9 = Const.map(constF, constant(true))
constF.map(x => "foo")
const test10 = fmap(Const, constF, constant(true))
// const test11 = fmap("foo", constant(true))

const test12 = pure(Identity)(2)
const test13 = ap(Identity, new Identity(2), new Identity(String))

// #endregion
