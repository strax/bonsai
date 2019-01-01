import { Kind } from "./kinds"
import { Identity } from "./Identity"
import { Functor, fmap } from "./Functor"
import { Const } from "./Const"
import { IO } from "./IO"
import { composeK } from "./Monad"

// This works over all functors
function mapToString<F extends Kind>(fa: Functor<F, number>) {
  return fmap(fa, String)
}

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

const n = mapToString(new Const(2)).get()

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
