import { Kind, Type1, Refine } from "./kinds"
import { Applicative } from "./Applicative"

export interface Monad<M extends Kind, A> extends Applicative<M, A> {
  [Monad.flatMap]<B>(f: (a: A) => Type1<M, B>): Refine<Type1<M, B>>
  [Monad.flatten]<A>(this: Type1<M, Type1<M, A>>): Refine<Type1<M, A>>
}

export namespace Monad {
  export const flatMap = Symbol("Monad.flatMap")
  export const flatten = Symbol("Monad.flatten")
}

export function chain<M extends Kind, A, B>(ma: Monad<M, A>, f: (a: A) => Type1<M, B>) {
  return ma[Monad.flatMap](f)
}

export function composeK<M extends Kind, A, B, C>(f: (b: B) => Monad<M, C>, g: (a: A) => Monad<M, B>) {
  return (a: A) => chain(g(a), f)
}
