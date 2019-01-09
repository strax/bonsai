import { Kind1, Type1, Fix } from "./Kind1"
import { Functor, FunctorInstance } from "./Functor"
import { Applicative, ApplicativeInstance } from "./Applicative"

// Unique tag to make `IdentityK` nominal
// This is as good as it gets to generate unique uninhabitated types;
// unique symbols need an extra type alias declaration compared to this
declare const enum Witness {}

namespace IdentityFunctor {
  export function map<A, B>(fa: Identity<A>, f: (a: A) => B): Identity<B> {
    return new Identity(f(fa.get()))
  }
}

namespace IdentityApplicative {
  export const functor = IdentityFunctor

  export function pure<A>(a: A): Identity<A> {
    return new Identity(a)
  }

  export function ap<A, B>(fa: Identity<A>, ff: Identity<(a: A) => B>): Identity<B> {
    const f = ff.get()
    return new Identity(f(fa.get()))
  }
}

type IdentityConstructor = typeof Identity
/**
 * This is the generic representation of Identity<?> that allows us to convert from
 * `Type1<IdentityK, A>` to `Identity<A>`.
 */
interface IdentityKind extends Kind1<Witness>, IdentityConstructor {
  [Kind1.refine]: this extends Type1<IdentityKind, infer A> ? Identity<A> : ~this
}

export class Identity<A> {
  static readonly [Kind1.kind] = (Identity as unknown) as IdentityKind
  static readonly [Functor.instance] = IdentityFunctor as Functor<IdentityKind>
  static readonly [Applicative.instance] = IdentityApplicative;

  readonly [Functor.instance] = IdentityFunctor as Functor<IdentityKind>;
  readonly [Applicative.instance] = IdentityApplicative;
  readonly [Kind1.kind] = Identity[Kind1.kind]

  constructor(private value: A) {}

  get(): A {
    return this.value
  }
}

// Annotate Identity to be isomorphic with `Type1<IdentityK, A>`;
// type merging is performed to avoid having to declare `Type1` members in the class
export interface Identity<A> extends Type1<IdentityKind, A> {}

type idt = Fix<IdentityKind, string>
