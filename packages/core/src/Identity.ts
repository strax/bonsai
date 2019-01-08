import { Kind1, Type1 } from "./kinds"
import { Functor } from "./Functor"
import { Applicative } from "./Applicative"

// Unique tag to make `IdentityK` nominal
// This is as good as it gets to generate unique uninhabitated types;
// unique symbols need an extra type alias declaration compared to this
declare const enum Witness {}

@protocol<Applicative<IdentityConstructor>>()
export class Identity<A> {
  static [Kind1.kind]: Identity$λ

  static [Functor.map]<A, B>(fa: Identity<A>, f: (a: A) => B): Identity<B> {
    return new Identity(f(fa.value))
  }

  static [Applicative.pure]<A>(a: A): Identity<A> {
    return new Identity(a)
  }

  static [Applicative.ap]<A, B>(fa: Identity<A>, ff: Identity<(a: A) => B>): Identity<B> {
    const f = ff.value
    return new Identity(f(fa.value))
  }

  constructor(private value: A) {}
}

type IdentityConstructor = typeof Identity

// Annotate Identity to be isomorphic with `Type1<IdentityK, A>`;
// type merging is performed to avoid having to declare `Type1` members in the class
export interface Identity<A> extends Type1<IdentityConstructor, A> {}

/**
 * This is the generic representation of Identity<?> that allows us to convert from
 * `Type1<IdentityK, A>` to `Identity<A>`.
 */
interface Identity$λ extends Kind1<Witness> {
  [Kind1.refine]: this extends Type1<IdentityConstructor, infer A> ? Identity<A> : never
}
