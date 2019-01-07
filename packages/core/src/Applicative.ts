import { Functor } from "./Functor"
import { Fix } from "./kinds"

export interface Applicative<F extends Functor<F>> extends Functor<F> {
  [Applicative.pure]<A>(a: A): Fix<F, A>

  [Applicative.ap]<A, B>(fa: Fix<F, A>, fab: Fix<F, (a: A) => B>): Fix<F, B>
}

export namespace Applicative {
  export const pure = Symbol("Applicative.pure")
  export const ap = Symbol("Applicative.ap")
}

export function ap<F extends Applicative<F>, A, B>(fa: Fix<F, A>, fab: Fix<F, (a: A) => B>): Fix<F, B> {
  return fa.constructor[Applicative.ap](fa, fab)
}

export function pure<F extends Applicative<F>>(ap: F): <A>(a: A) => Fix<F, A> {
  return a => ap[Applicative.pure](a)
}

export function map2<F extends Applicative<F>, A, B, C>(fa: Fix<F, A>, fb: Fix<F, B>, f: (a: A, b: B) => C): Fix<F, C> {
  const ff = pure(fa.constructor)((a: A) => (b: B) => f(a, b))
  return ap(fb, ap(fa, ff))
}
