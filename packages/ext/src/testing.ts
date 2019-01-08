import {
  Traversable,
  Identity,
  sequence,
  IsTraversable,
  IsApplicative,
  Fix,
  IsFunctor,
  fmap,
  Kind1,
  traverse
} from "@bonsai/core"

Traversable(Array).sequence([new Identity(2)])
Traversable(Array).traverse([1, 2, 3], (a: number) => new Identity(a))

type NoInfer<T> = { [K in keyof T]: T[K] } & T

// const traverse = <F extends IsFunctor, A>(fa: Fix<F, A>): Fix<F, A> => {
//   return fa
// }

declare function inj<F extends Kind1, A>(fa: Fix<F, A>): Fix<F, A>

inj(new Identity(2))

const g = traverse([new Identity(2)], x => x)
const x = sequence([new Identity(2)])
