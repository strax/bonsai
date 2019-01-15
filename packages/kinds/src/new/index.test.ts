import { Kind1, Kind2, Type2, Ap, Lambda, _, λ, Ap2, Type1 } from "."

class Const<A, B> {}
declare const enum Const$rep {}
interface Const$type extends Kind2<Const$rep> {
  this: this extends Type2<Const$type, infer A, infer B> ? Const<A, B> : never
}
interface Const<A, B> extends Type2<Const$type, A, B> {}

interface Functor<F extends Kind1> {
  id<A>(fa: Ap<F, A>): Ap<F, A>
  map<A, B>(fa: Ap<F, A>, f: (a: A) => B): Ap<F, B>
}

type partial1 = Ap<Lambda<Const<number, Const<string, _>>>, string>

interface Profunctor<P extends Kind2> {
  id<A, B>(pab: Ap2<P, A, B>): Ap2<P, A, B>
  dimap<A, B, C, D>(pab: Ap2<P, A, B>, f: (c: C) => A, h: (b: B) => D): Ap2<P, C, D>
}

declare const invalid: Functor<Lambda<Const<_, _>>>

declare const ConstFunctor: Functor<λ<Const<string, _>>>

declare const ConstProfunctor: Profunctor<λ<Const<_, _>>>

class Identity<A> {}
declare const enum Identity$rep {}
interface Identity$type extends Kind1<Identity$rep> {
  this: this extends Type1<Identity$type, infer A> ? Identity<A> : never
}
interface Identity<A> extends Type1<Identity$type, A> {}

declare const x: Identity<string>

function id1<F extends Kind1, A>(fa: Ap<F, A>): Ap<F, A> {
  return fa as Ap<F, A>
}

type zz = Ap<λ<Identity<_>>, string>

ConstProfunctor.id(cstring)

function fmap<F extends Kind1, A, B>(F: Functor<F>, fa: Ap<F, A>, f: (a: A) => B) {
  return F.map(fa, f)
}

declare const cnumber: Const<number, boolean>
declare const cstring: Const<string, boolean>

type z = Ap<Lambda<Const<_, _>>, string>

// TODO: Need to annotate `x` here
fmap(ConstFunctor, cstring, x => 222)

declare const IdentityFunctor: Functor<λ<Identity<_>>>

declare const id2: Identity<string>
fmap(IdentityFunctor, id2, x => x)
