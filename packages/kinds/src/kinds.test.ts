import { Type1, Kind1, Ap, Kind, Type, Kind2, Kind3, Type2, Type3, Ap2, Ap3 } from "./kinds"
import { _, λ } from "./TypeLambda"

// #region Example containers with kinds * -> * and * -> * -> *

class Identity<A> {
  constructor(private value: A) {}

  runIdentity(): A {
    return this.value
  }
}

// #region Encoding for Identity, this follows the same structure for all kinds * -> *
// 1. Declare an uninhabitated type F$witness that acts as a
//    witness that the kind in question is indeed for the type in question
declare const enum Identity$witness {}
// 2. Declare an interface F$kind that extends the Kind1 interface;
//    the Kind1.refine property does not exist at runtime but contains the mapping from
//    a Type1<F$kind, A> to F<A>
interface Identity$kind extends Kind1<Identity$witness> {
  [Kind.refine]: this extends Type1<Identity$kind, infer A> ? Identity<A> : never
}
// 3. Augment the original type to be assignable to Type1<F$kind, A>
interface Identity<A> extends Type1<Identity$kind, A> {}
// #endregion

class Const<A, B> {
  constructor(private a: A) {}

  runConst(): A {
    return this.a
  }
}

// Const has kind * -> * -> * so we extend Kind2 instead of Kind1 and Type2 instead of Type1
declare const enum Const$witness {}
interface Const$kind extends Kind2<Const$witness> {
  [Kind.refine]: this extends Type2<Const$kind, infer T1, infer T2> ? Const<T1, T2> : never
}
interface Const<A, B> extends Type2<Const$kind, A, B> {}

class Forget<R, A, B> {
  constructor(private f: (a: A) => R) {}
}

declare const enum Forget$witness {}
interface Forget$kind extends Kind3<Forget$witness> {
  [Kind.refine]: this extends Type3<Forget$kind, infer T1, infer T2, infer T3> ? Forget<T1, T2, T3> : never
}
interface Forget<R, A, B> extends Type3<Forget$kind, R, A, B> {}

type zz = Identity<string>[Type.witness]

// #endregion

declare function fix<F extends Kind1, A>(fa: Ap<F, A>): Ap<F, "Changed">

declare function fix2<F extends Kind2, A, B>(fa: Ap2<F, A, B>): Ap2<F, "Changed A", "Changed B">

declare function fix3<F extends Kind3, A, B, C>(fa: Ap3<F, A, B, C>): Ap3<F, "Changed A", "Changed B", "Changed C">

// #region Moving between Type1 and concrete types
// Identity :: * -> *
const test2 = fix(new Identity("foo"))
// For kinds * -> * -> * there exists an auxiliary kind
// Kind2.λ<K extends Kind2, A> <: Kind1 which allows us to
// operate on partially-applied kinds
// const test3 = prj(inj(new Const<number, string>(2)))
// const test4 = fix(new Const<number, string>(2))

// Const :: * -> * -> *
const test6 = fix2(new Const<number, string>(2))

// Forget :: * -> * -> * -> *
// const test7 = prj2(inj2(new Forget<string, number, string>(n => "foo")))
const test9 = fix3(new Forget<string, number, string>(n => "foo"))
// const test10 = fix2(new Forget<string, number, string>(n => "foo"))
// const test11 = fix(new Forget<string, number, string>(n => "foo"))
// #endregion

interface Functor<F extends Kind1> {
  map<A, B>(fa: Ap<F, A>, f: (a: A) => B): Ap<F, B>
}

declare const IdentityFunctor: Functor<λ<Identity<_>>>
declare const ConstFunctor: Functor<λ<Const<string, _>>>
