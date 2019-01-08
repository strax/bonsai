import "./extensions"

import { Kind1, λ, Fix, Type1, Refine, HasKind1 } from "./kinds"
import { Identity } from "./Identity"
import { Functor, fmap } from "./Functor"
import { Const } from "./Const"
import { IO } from "./IO"
import { composeK, flatten } from "./Monad"
import { pure, Applicative } from "./Applicative"
import { sequence, traverse, Traversable } from "./Traversable"
import { string } from "fast-check/*"

// This works over all functors
function mapToString<F extends Functor<F>, A>(fa: Fix<F, A>) {
  return fmap(fa, String)
}

function inj<F extends HasKind1, A>(fa: Fix<F, A>): Fix<F, A> {
  return fa
}

const ida = inj([1, 2, 3])

const xx: Identity<string> = mapToString(new Identity(2))

const arrayString = mapToString([1, 2, 3])

const n = mapToString(new Const<number, number>(2))

const idString = mapToString(new Identity(2))

console.log(arrayString)
console.log(n)
console.log(idString)

declare const id: Identity<string>

function askName(_: number): IO<string> {
  return new IO(() => "Sami")
}

function printName(name: string): IO<void> {
  return new IO(() => console.log(name))
}

const askAndPrint = composeK(
  printName,
  askName
)

function mapToStringAndBack<F extends Functor<F>>(fa: Fix<F, number>): Fix<F, number> {
  return fmap(fmap(fa, String), parseInt)
}

function mapTwiceToConstant<F extends Functor<F>, A, B>(fa: Fix<F, A>, b: B): Fix<F, B> {
  return fmap(fmap(fa, _ => b), _ => b)
}

const cstring = mapTwiceToConstant(new Const<number, number>(2), "foobar")
const istring = mapTwiceToConstant(new Identity(2), "foo")

const seq = sequence([new Identity(2)])

declare function inj2<G extends Applicative<G>, A>(ga: Fix<G, A>): Fix<G, A>

inj2(new Identity(2))

const seq2 = traverse([1, 2, 3], a => new Identity(a))

const ab = traverse([1, 2, 3], (n: number) => new Identity(String(n)))

const ab2 = sequence([new Identity(2), new Identity(3)])

const xxx = flatten(new Identity(new Identity(2)))
