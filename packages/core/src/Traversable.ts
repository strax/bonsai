import { Kind1, Fix, HasKind1, Type1 } from "./kinds"
import { Applicative } from "./Applicative"

export namespace Traversable {
  export const traverse = Symbol("Traversable.traverse")
  export const sequence = Symbol("Traversable.sequence")
}

type Sequence<F extends HasKind1, T> = T extends Fix<infer G, infer A> ? Fix<G, Fix<F, A>> : never

export interface Traversable<F extends Traversable<F>> extends HasKind1 {
  [Traversable.traverse]<G extends Applicative<G>, A, B>(fa: Fix<F, A>, f: (a: A) => Fix<G, B>): Fix<G, Fix<F, B>>
  [Traversable.sequence]<G extends Applicative<G>, A>(fga: Fix<F, Fix<G, A>>): Fix<G, Fix<F, A>>
}

// TODO: Can we have inference without capturing the whole `T` here?
export function sequence<F extends Traversable<F>, T extends Fix<Applicative<any>, any>>(
  fga: Fix<F, T>
): Sequence<F, T> {
  return fga.constructor[Traversable.sequence](fga as Fix<F, Fix<any, any>>) as Sequence<F, T>
}

export function traverse<F extends Traversable<F>, G extends Applicative<G>, A, B>(
  fa: Fix<F, A>,
  f: (a: A) => Fix<G, B>
): Fix<G, Fix<F, B>> {
  return fa.constructor[Traversable.traverse](fa, f)
}
