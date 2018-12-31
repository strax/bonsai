import { Type1, Repr } from "./kinds"
import { Functor } from "./Functor"

// Unique tag to make `IdentityK` nominal
// This is as good as it gets to generate unique uninhabitated types;
// unique symbols need an extra type alias declaration compared to this
declare const enum Tag {}

export class Identity<A> {
  map<B>(f: (a: A) => B): Identity<B> {
    return new Identity(f(this.value))
  }

  [Functor.map]<B>(f: (a: A) => B) {
    return this.map(f)
  }

  constructor(private value: A) {}
}

// Annotate Identity to be isomorphic with `Type1<IdentityK, A>`;
// type merging is performed to avoid having to declare `Type1` members in the class
export interface Identity<A> extends Type1<IdentityK, A> {}

/**
 * This is the type constructor that allows us to get back to `Identity<A>` from a `Type1<IdentityK, A>`
 */
interface IdentityK extends Repr<Tag> {
  [Repr.λ]: this extends Type1<IdentityK, infer A> ? Identity<A> : never
}
