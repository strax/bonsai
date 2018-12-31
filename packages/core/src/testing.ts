import { Repr, Type1, Type2, TypeWitness } from "./kinds"
import { Identity } from "./Identity"
import { Functor } from "./Functor"
import { Const } from "./Const"

// This works over all functors
function mapToString<F extends Repr>(fa: Functor<F, number>) {
  return fa[Functor.map](String)
}

function inj1<F extends Repr, A>(fa: Type1<F, A>): Type1<F, A> {
  return fa
}
function prj2<F extends Repr, A, B>(fa: Type2<F, A, B>): Type2<F, A, B> {
  return fa
}

function prj1<F extends Repr, A>(fa: Type1<F, A>): Type1.Prj<F, A> {
  return fa
}

// function inj2<F extends Repr, A>(fa: )

const identityString = mapToString(new Identity(2)).map(() => true)

const arrayString = mapToString([1, 2, 3]).map(() => 2)

const constString = mapToString(new Const(2))

const fn = (a: number, x: string) => a * 2
type fn = typeof fn
type l = Parameters<fn>
const z: ThisType<fn> = "hi"

declare const id: Identity<string>
const identitySame = prj1(inj1(id))
