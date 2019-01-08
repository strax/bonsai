import "./array.types"
import { op } from "./op"
import {
  Functor,
  Applicative,
  Monad,
  Traversable,
  pure,
  fmap,
  map2,
  ApplicativeInstance,
  IsApplicative
} from "@bonsai/core"
import { Fix, Kind1 } from "@bonsai/core/dist/kinds"

namespace ArrayFunctor {
  export function map<A, B>(fa: Array<A>, f: (a: A) => B): Array<B> {
    return fa.map(a => f(a))
  }
}

namespace ArrayApplicative {
  export const functor = ArrayFunctor

  export function pure<A>(a: A): Array<A> {
    return Array.of(a)
  }

  export function ap<A, B>(fa: Array<A>, fab: Array<(a: A) => B>): Array<B> {
    return ArrayMonad.flatMap(fa, a => fab.map(f => f(a)))
  }
}

namespace ArrayMonad {
  export const applicative = ArrayApplicative

  export function flatMap<A, B>(fa: Array<A>, f: (a: A) => Array<B>): Array<B> {
    return fa.flatMap(a => f(a))
  }
}

namespace ArrayTraversable {
  export const functor = ArrayFunctor

  export function traverse<G extends IsApplicative, A, B>(as: Array<A>, f: (a: A) => Fix<G, B>): Fix<G, Array<B>> {
    return sequence(as.map(f))
  }

  export function sequence<G extends IsApplicative, A>(gas: Array<Fix<G, A>>): Fix<G, Array<A>> {
    const xs = gas.map(_ => fmap(_, Array.of))
    return xs.reduce((ga0, ga1) => map2(ga0, ga1, (as0, as1) => [...as0, ...as1]))
  }
}

Array[Functor.instance] = ArrayFunctor
Array[Applicative.instance] = ArrayApplicative
Array[Monad.instance] = ArrayMonad
Array[Traversable.instance] = ArrayTraversable

Array.prototype[Functor.instance] = ArrayFunctor
Array.prototype[Applicative.instance] = ArrayApplicative
Array.prototype[Monad.instance] = ArrayMonad
Array.prototype[Traversable.instance] = ArrayTraversable
