import { Kind, Type1, Functor, Monad, Applicative, id } from "@bonsai/core"

import Future, { FutureInstance, FutureTypeRep } from "fluture"

declare const enum Future$Witness {}

interface Future$Kind<L> extends Kind<[Future$Witness, L]> {
  [Kind.refine]: this extends Type1<Future$Kind<L>, infer R> ? FutureInstance<L, R> : never
}

declare module "fluture" {
  interface FutureTypeRep {
    [Applicative.pure]<A, L = never>(a: A): FutureInstance<L, A>
    prototype: FutureInstance<any, any>
  }
  interface FutureInstance<L, R> extends Type1<Future$Kind<L>, R>, Monad<Future$Kind<L>> {}
}

Future[Applicative.pure] = function pure<A, L = never>(a: A): FutureInstance<L, A> {
  return Future.of(a)
}

Future.prototype[Functor.map] = function map<L, RA, RB>(
  this: FutureInstance<L, RA>,
  f: (a: RA) => RB
): FutureInstance<L, RB> {
  return this.map(f)
}

Future.prototype[Applicative.ap] = function ap<L, RA, RB>(
  this: FutureInstance<L, RA>,
  fab: FutureInstance<L, (ra: RA) => RB>
): FutureInstance<L, RB> {
  return Future.ap(fab, this)
}

Future.prototype[Monad.flatMap] = function flatMap<L, RA, RB>(
  this: FutureInstance<L, RA>,
  f: (ra: RA) => FutureInstance<L, RB>
) {
  return this.chain(f)
}

Future.prototype[Monad.flatten] = function flatten<L, R>(
  this: FutureInstance<L, FutureInstance<L, R>>
): FutureInstance<L, R> {
  return this.chain(id)
}
