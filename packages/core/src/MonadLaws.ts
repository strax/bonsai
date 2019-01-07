import { Arbitrary, property } from "fast-check"
import { Monad, chain } from "./Monad"
import { Applicative, pure } from "./Applicative"
import { Kind1, Fix } from "./kinds"

export namespace MonadLaws {
  function LeftIdentity<M extends Monad<M>, A, B>(
    M: M,
    arbA: Arbitrary<A>,
    arbF: Arbitrary<(a: A) => Fix<M, B>>
  ) {
    return property(arbA, arbF, (a, f) => {
      return chain(pure(M)(a), f) === f(a)
    })
  }

  function RightIdentity<M extends Monad<M>, A>(M: M, arbMA: Arbitrary<Fix<M, A>>) {
    return property(arbMA, (ma) => {
      return chain(ma, pure(M)) === ma
    })
  }

  // TODO: Associativity
  // (m >>= f) >>= g ≡ m >>= (\x -> f x >>= g)

  function Associativity<M extends Monad<M>, A
}
