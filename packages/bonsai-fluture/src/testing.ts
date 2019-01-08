import { Functor, fmap, constant, Monad, Kind1, Fix, IsFunctor, Applicative } from "@bonsai/core"
import Future from "fluture"

const as = <B>(b: B) => <F extends IsFunctor, A>(fa: Fix<F, A>) => {
  return fmap(fa, constant(b))
}

const fb = fmap(Future.of<Error, number>(2), x => x)
