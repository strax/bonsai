import { Kind, Functor, λ, Refine, fmap, constant, Monad } from "@bonsai/core"
import Future from "fluture"

const as = <B>(b: B) => <F extends Kind, A>(fa: Functor<F> & λ<F, A>) => {
  const x1 = fmap(fa, constant(b))
  return fmap(x1, constant("foo"))
}
