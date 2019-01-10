import { Kind1, Type1, Fix } from "@bonsai/kinds"
import { ApplicativeSyntax } from "./Applicative"

export class Identity<A> extends ApplicativeSyntax<Identity$kind> {
  constructor(private value: A) {
    super(Identity)
  }

  get(): A {
    return this.value
  }
}

export namespace Identity {
  export function map<A, B>(fa: Identity<A>, f: (a: A) => B): Identity<B> {
    return new Identity(f(fa.get()))
  }

  export function pure<A>(a: A): Fix<Identity$kind, A> {
    return new Identity(a)
  }

  export function ap<A, B>(fa: Identity<A>, ff: Identity<(a: A) => B>): Identity<B> {
    const f = ff.get()
    return new Identity(f(fa.get()))
  }
}
// #region HKT encoding
// Unique tag to make `IdentityK` nominal
// This is as good as it gets to generate unique uninhabitated types;
// unique symbols need an extra type alias declaration compared to this
declare const enum Witness {}

/**
 * This is the encoding of Identity :: * -> *
 * The [Kind1.refine] parameter allows us to obtain a concrete Identity<A> from a "generic" type application
 */
interface Identity$kind extends Kind1<Witness> {
  [Kind1.refine]: [this] extends [Type1<Identity$kind, infer A>] ? Identity<A> : never
}

export interface Identity<A> extends Type1<Identity$kind, A> {}
// #endregion
