import "./extensions"

import { Kind, λ, Fix } from "./kinds"
import { Identity } from "./Identity"
import { Functor, fmap } from "./Functor"
import { Const } from "./Const"
import { IO } from "./IO"
import { composeK } from "./Monad"

// This works over all functors
function mapToString<F extends Kind>(fa: Functor<F> & λ<F, number>) {
  return fmap(fa, String)
}

function inj<F extends Kind, A>(fa: Fix<F, A>): Fix<F, A> {
  return fa
}

function mapToString2<F extends Kind>(fa: Functor<F> & Fix<F, number>) {
  return fmap(fmap(fa, String), parseInt)
}

mapToString2(new Identity(2))

// function inj1<F extends Kind, A>(fa: Type1<F, A>): Type1<F, A> {
//   return fa
// }
// function prj2<F extends Kind, A, B>(fa: λ<F, λ): Type2<F, A, B> {
//   return fa
// }

// function prj1<F extends Kind, A>(fa: Type1<F, A>): Refine<Type1<F, A>> {
//   return (fa as unknown) as Refine<Type1<F, A>>
// }

// function inj2<F extends Repr, A>(fa: )

const arrayString = mapToString([1, 2, 3])

const n = mapToString(new Const(2))

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
