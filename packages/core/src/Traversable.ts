import { Applicative } from "./Applicative"
import { Kind1, Ap } from "@bonsai/kinds"
import { FunctorInstance, FunctorOps } from "./Functor"

export interface TraversableInstance<F extends Kind1> extends FunctorInstance<F> {
  [Traversable.traverse]<G extends Kind1, A, B>(G: Applicative<G>, fa: Ap<F, A>, f: (a: A) => Ap<G, B>): Ap<G, Ap<F, B>>
  [Traversable.sequence]<G extends Kind1, A>(G: Applicative<G>, fga: Ap<F, Ap<G, A>>): Ap<G, Ap<F, A>>
}

export interface TraversableOps<F extends Kind1> extends FunctorOps<F> {
  traverse<G extends Kind1, A, B>(G: Applicative<G>, fa: Ap<F, A>, f: (a: A) => Ap<G, B>): Ap<G, Ap<F, B>>
  sequence<G extends Kind1, A>(G: Applicative<G>, fga: Ap<F, Ap<G, A>>): Ap<G, Ap<F, A>>
}

export function TraversableOps<F extends Kind1>(F: TraversableInstance<F>) {
  return class extends FunctorOps(F) implements TraversableOps<F> {
    traverse = F[Traversable.traverse]
    sequence = F[Traversable.sequence]
  }
}

export function Traversable<F extends Kind1>(from: Traversable<F>): TraversableOps<F> {
  if (Traversable.traverse in from) {
    return new (TraversableOps(from as TraversableInstance<F>))()
  } else {
    return from as TraversableOps<F>
  }
}

export namespace Traversable {
  export const traverse = Symbol("Traversable.traverse")
  export const sequence = Symbol("Traversable.sequence")
}

export type Traversable<F extends Kind1> = TraversableInstance<F> | TraversableOps<F>
