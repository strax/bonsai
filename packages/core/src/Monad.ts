import { Fix, Kind1, HasKind1 } from "./Kind1"
import { Applicative, ApplicativeInstance, IsApplicative } from "./Applicative"

export interface Monad<M extends Kind1> {
  applicative: Applicative<M>

  flatMap<A, B>(ma: Fix<M, A>, f: (a: A) => Fix<M, B>): Fix<M, B>
}

export interface IsMonad extends IsApplicative {
  [Monad.instance]: Monad<this>
}

export function Monad<F extends IsMonad>(F: HasKind1<F>): Monad<F> {
  return F[Kind1.kind][Monad.instance]
}

export interface MonadInstance<F extends Kind1> extends ApplicativeInstance<F> {
  [Monad.instance]: Monad<F>
}

export namespace Monad {
  export const flatMap = Symbol("Monad.flatMap")

  export const instance = Symbol("Monad.instance")
}

export function flatMap<M extends IsMonad, A, B>(ma: Fix<M, A>, f: (a: A) => Fix<M, B>) {
  return Monad<M>(ma).flatMap(ma, f)
}

export const chain = flatMap

export function flatten<M extends IsMonad, A>(ma: Fix<M, Fix<M, A>>): Fix<M, A> {
  return Monad<M>(ma).flatMap(ma, x => x)
}

export function composeK<M extends IsMonad, A, B, C>(f: (b: B) => Fix<M, C>, g: (a: A) => Fix<M, B>) {
  return (a: A) => flatMap(g(a), f)
}
