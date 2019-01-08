import Future, { FutureInstance } from "fluture"
import { Kind1, Kind2, Functor, Applicative, Monad } from "@bonsai/core"
import { FutureKind, Future$λ } from "./fluture.types"

namespace FutureFunctor {
  export function map<L, RA, RB>(fa: FutureInstance<L, RA>, f: (a: RA) => RB): FutureInstance<L, RB> {
    return fa.map(f)
  }
}

namespace FutureApplicative {
  export const functor = FutureFunctor

  export function pure<A, L = never>(a: A): FutureInstance<L, A> {
    return Future.of(a)
  }

  export function ap<L, RA, RB>(
    fa: FutureInstance<L, RA>,
    fab: FutureInstance<L, (ra: RA) => RB>
  ): FutureInstance<L, RB> {
    return Future.ap(fab, fa)
  }
}

namespace FutureMonad {
  export const applicative = FutureApplicative

  export function flatMap<L, RA, RB>(fa: FutureInstance<L, RA>, f: (ra: RA) => FutureInstance<L, RB>) {
    return fa.chain(f)
  }
}

Future.prototype[Kind1.kind] = (Future as unknown) as Future$λ
Future.prototype[Kind2.kind] = Future as FutureKind
Future[Kind1.kind] = (Future as unknown) as Future$λ
Future[Kind2.kind] = Future as FutureKind

Future[Functor.instance] = FutureFunctor
Future[Applicative.instance] = FutureApplicative
Future[Monad.instance] = FutureMonad
