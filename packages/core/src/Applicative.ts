import { Functor, fmap } from "./Functor"
import { Kind, Type1, Refine, λ } from "./kinds"
import { constant } from "./utils"

export interface Applicative<F extends Kind> extends Functor<F> {
  constructor: {
    [Applicative.pure]<A>(a: A): Refine<Type1<F, A>>
  }

  [Applicative.ap]<A, B>(this: Type1<F, A>, fab: Type1<F, (a: A) => B>): Refine<Type1<F, B>>
}

export namespace Applicative {
  export const pure = Symbol("Applicative.pure")
  export const ap = Symbol("Applicative.ap")
}

export function ap<F extends Kind, A, B>(
  fa: Applicative<F> & Type1<F, A>,
  fab: Type1<F, (a: A) => B>
): Refine<Type1<F, B>> {
  return fa[Applicative.ap](fab)
}

export function map2<F extends Kind, A, B, C>(
  fa: Applicative<F> & Type1<F, A>,
  fb: Applicative<F> & Type1<F, B>,
  f: (a: A, b: B) => C
): Refine<Type1<F, C>> {
  const ff = fa.constructor[Applicative.pure]((a: A) => (b: B) => f(a, b))
  return ap(fb, ap(fa, ff))
}
