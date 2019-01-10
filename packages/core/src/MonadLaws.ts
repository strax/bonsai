import { Arbitrary, property } from "fast-check"
import { Monad, flatMap } from "./Monad"
import { pure } from "./Applicative"
import { Kind1, Fix } from "@bonsai/kinds"

export namespace MonadLaws {
  function LeftIdentity<M extends Kind1, A, B>(M: Monad<M>, arbA: Arbitrary<A>, arbF: Arbitrary<(a: A) => Fix<M, B>>) {
    return property(arbA, arbF, (a, f) => {
      return flatMap(M, pure(M)(a), f) === f(a)
    })
  }

  function RightIdentity<M extends Kind1, A>(M: Monad<M>, arbMA: Arbitrary<Fix<M, A>>) {
    return property(arbMA, ma => {
      return flatMap(M, ma, pure(M)) === ma
    })
  }

  // TODO: Associativity
  // (m >>= f) >>= g ≡ m >>= (\x -> f x >>= g)

  function Associativity<M extends Kind1, A, B>(M: Monad<M>, arbF: Arbitrary<Fix<M, A>>) {}
}
