import { Kind1, Of, TypeFamily } from "tshkt"
import { IsApplicative } from "./Applicative"
import { Functor } from "./Functor"

export interface Traversable<F, A> extends Functor<F, A> {
  traverse<G extends IsApplicative<G>, B>(this: Of<F, A>, f: (a: A) => Of<G, B>): Of<G, Of<F, B>>
}

export interface IsTraversable<F> extends TypeFamily<Kind1> {
  (): Traversable<F, this[0]>
}

export function sequence<G extends IsApplicative<G>, F extends IsTraversable<F>, A>(
  fga: Of<F, Of<G, A>>
): Of<G, Of<F, A>> {
  return fga.traverse(x => x)
}
