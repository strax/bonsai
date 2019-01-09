import { Kind1, Fix, HasKind1 } from "./Kind1"
import { IsApplicative } from "./Applicative"
import { Functor, FunctorInstance, IsFunctor } from "./Functor"

export function Traversable<F extends IsTraversable>(F: HasKind1<F>): Traversable<F> {
  return F[Kind1.kind][Traversable.instance]
}

export interface IsTraversable extends IsFunctor {
  [Traversable.instance]: Traversable<this>
}

export namespace Traversable {
  export const traverse = Symbol("Traversable.traverse")
  export const sequence = Symbol("Traversable.sequence")

  export const instance = Symbol("Traversable.instance")
}

export interface TraversableInstance<F extends Kind1> extends FunctorInstance<F> {
  [Traversable.instance]: Traversable<F>
}

type Sequence<F extends Kind1, T> = T extends Fix<infer G, infer A> ? Fix<G, Fix<F, A>> : never

export interface Traversable<F extends Kind1> {
  functor: Functor<F>

  traverse<G extends IsApplicative, A, B>(fa: Fix<F, A>, f: (a: A) => Fix<G, B>): Fix<G, Fix<F, B>>
  sequence<G extends IsApplicative, A>(fga: Fix<F, Fix<G, A>>): Fix<G, Fix<F, A>>
}

// TODO: Can we have inference without capturing the whole `T` here?
export function sequence<A, F extends IsTraversable, G extends IsApplicative>(fga: Fix<F, Fix<G, A>>) {
  return Traversable<F>(fga).sequence<G, A>(fga)
}

type NoInfer<T> = T & { [K in keyof T]: T[K] }

export const traverse = <F extends IsTraversable, A, G extends IsApplicative, B>(
  fa: Fix<F, A>,
  f: (a: A) => Fix<G, B>
): Fix<G, Fix<F, B>> => {
  return Traversable<F>(fa).traverse(fa, f)
}
