import { Ap, Kind1 } from "@bonsai/kinds"
import { FunctorOps, FunctorInstance, FunctorSyntax } from "./Functor"

export interface ApplicativeInstance<F extends Kind1> extends FunctorInstance<F> {
  [Applicative.pure]<A>(a: A): Ap<F, A>
  [Applicative.ap]<A, B>(fa: Ap<F, A>, fab: Ap<F, (a: A) => B>): Ap<F, B>
}

export function Applicative<F extends Kind1>(from: Applicative<F>): ApplicativeOps<F> {
  if (Applicative.pure in from) {
    return new (ApplicativeOps(from as ApplicativeInstance<F>))()
  } else {
    return from as ApplicativeOps<F>
  }
}

export namespace Applicative {
  export const pure = Symbol("Applicative.pure")
  export const ap = Symbol("Applicative.ap")
}

export interface ApplicativeOps<F extends Kind1> extends FunctorOps<F> {
  pure<A>(a: A): Ap<F, A>
  ap<A, B>(fa: Ap<F, A>, fab: Ap<F, (a: A) => B>): Ap<F, B>
}

export function ApplicativeOps<F extends Kind1>(F: ApplicativeInstance<F>) {
  return class extends FunctorOps(F) implements ApplicativeOps<F> {
    pure = F[Applicative.pure]
    ap = F[Applicative.ap]
  }
}

export abstract class ApplicativeSyntax<F extends Kind1> extends FunctorSyntax<F> {
  private applicative: ApplicativeOps<F>

  constructor(F: Applicative<F>) {
    super(F)
    this.applicative = Applicative(F)
  }

  ap<A, B>(this: Ap<F, A>, fab: Ap<F, (a: A) => B>): Ap<F, B> {
    return ((this as unknown) as ApplicativeSyntax<F>).applicative.ap(this, fab)
  }
}

export type Applicative<F extends Kind1> = ApplicativeInstance<F> | ApplicativeOps<F>

export function ap<F extends Kind1, A, B>(F: Applicative<F>, fa: Ap<F, A>, fab: Ap<F, (a: A) => B>): Ap<F, B> {
  return Applicative(F).ap(fa, fab)
}

export function pure<F extends Kind1>(F: Applicative<F>): <A>(a: A) => Ap<F, A> {
  return a => Applicative(F).pure(a)
}

export function map2<F extends Kind1, A, B, C>(
  F: Applicative<F>,
  fa: Ap<F, A>,
  fb: Ap<F, B>,
  f: (a: A, b: B) => C
): Ap<F, C> {
  const { pure, ap } = Applicative(F)
  const ff = pure((a: A) => (b: B) => f(a, b))
  return ap(fb, ap(fa, ff))
}
