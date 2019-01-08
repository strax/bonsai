import { Functor, FunctorInstance, IsFunctor } from "./Functor"
import { Fix, Kind1, HasKind1, Type1 } from "./kinds"

export interface Applicative<F extends Kind1> {
  functor: Functor<F>

  pure<A>(a: A): Fix<F, A>
  ap<A, B>(fa: Fix<F, A>, fab: Fix<F, (a: A) => B>): Fix<F, B>
}

export interface IsApplicative extends IsFunctor {
  [Applicative.instance]: Applicative<this>
}

export function Applicative<F extends IsApplicative>(F: HasKind1<F>): Applicative<F> {
  return F[Kind1.kind][Applicative.instance]
}

export namespace Applicative {
  export const instance = Symbol("Applicative.instance")
}

export interface ApplicativeConstraint extends Kind1 {
  [Applicative.instance]: Applicative<this>
}

export interface ApplicativeInstance<F extends Kind1> extends FunctorInstance<F> {
  [Applicative.instance]: Applicative<F>
}

export function ap<F extends IsApplicative, A, B>(fa: Fix<F, A>, fab: Fix<F, (a: A) => B>): Fix<F, B> {
  return Applicative<F>(fa).ap(fa, fab)
}

export function pure<F extends IsApplicative>(A: HasKind1<F>): <A>(a: A) => Fix<F, A> {
  return a => Applicative(A).pure(a)
}

export function map2<F extends IsApplicative, A, B, C>(fa: Fix<F, A>, fb: Fix<F, B>, f: (a: A, b: B) => C): Fix<F, C> {
  const ff = pure<F>(fa)((a: A) => (b: B) => f(a, b))
  return ap(fb, ap(fa, ff))
}
