import { Fix } from "./kinds"
import { Applicative } from "./Applicative"
import { id } from "./utils"

export interface Monad<M extends Applicative<M>> extends Applicative<M> {
  [Monad.flatMap]<A, B>(ma: Fix<M, A>, f: (a: A) => Fix<M, B>): Fix<M, B>
}

export namespace Monad {
  export const flatMap = Symbol("Monad.flatMap")
}

export function flatMap<M extends Monad<M>, A, B>(ma: Fix<M, A>, f: (a: A) => Fix<M, B>) {
  return ma.constructor[Monad.flatMap](ma, f)
}

export const chain = flatMap

export function flatten<M extends Monad<M>, A, B>(ma: Fix<M, Fix<M, A>>): Fix<M, A> {
  return flatMap(ma, id)
}

export function composeK<M extends Monad<M>, A, B, C>(f: (b: B) => Fix<M, C>, g: (a: A) => Fix<M, B>) {
  return (a: A) => flatMap(g(a), f)
}
