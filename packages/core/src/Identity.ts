import { Kind, Type1, Refine } from "./kinds"
import { Functor } from "./Functor"
import { Applicative } from "./Applicative"

// Unique tag to make `IdentityK` nominal
// This is as good as it gets to generate unique uninhabitated types;
// unique symbols need an extra type alias declaration compared to this
declare const enum Witness {}

export class Identity<A> implements Applicative<Identity$Kind> {
  static [Applicative.pure]<A>(a: A): Identity<A> {
    return this.pure(a)
  }

  static readonly pure = Identity[Applicative.pure]

  readonly map = this[Functor.map]
  readonly ap = this[Applicative.ap];

  [Functor.map]<A, B>(this: Identity<A>, f: (a: A) => B) {
    return new Identity(f(this.value))
  }

  [Applicative.ap]<A, B>(this: Identity<A>, other: Identity<(a: A) => B>): Identity<B> {
    return other[Functor.map](f => f(this.value))
  }

  constructor(private value: A) {}
}

// Annotate Identity to be isomorphic with `Type1<IdentityK, A>`;
// type merging is performed to avoid having to declare `Type1` members in the class
export interface Identity<A> extends Type1<Identity$Kind, A> {
  constructor: typeof Identity
}

/**
 * This is the generic representation of Identity<?> that allows us to convert from
 * `Type1<IdentityK, A>` to `Identity<A>`.
 */
interface Identity$Kind extends Kind<Witness> {
  [Kind.refine]: this extends Type1<Identity$Kind, infer A> ? Identity<A> : never
}
