import { Arbitrary, property } from "fast-check"
import { Monad, MonadInstance, IsMonad } from "./Monad"
import { pure } from "./Applicative"
import { Kind1, Fix, HasKind1 } from "./kinds"

export namespace MonadLaws {
  function LeftIdentity<M extends IsMonad, A, B>(
    M: HasKind1<M>,
    arbA: Arbitrary<A>,
    arbF: Arbitrary<(a: A) => Fix<M, B>>
  ) {
    return property(arbA, arbF, (a, f) => {
      return Monad(M).flatMap(pure(M)(a), f) === f(a)
    })
  }

  function RightIdentity<M extends IsMonad, A>(M: HasKind1<M>, arbMA: Arbitrary<Fix<M, A>>) {
    return property(arbMA, ma => {
      return Monad(M).flatMap(ma, pure(M)) === ma
    })
  }

  // TODO: Associativity
  // (m >>= f) >>= g ≡ m >>= (\x -> f x >>= g)

  function Associativity<M extends Kind1, A, B>(M: MonadInstance<M>, arbF: Arbitrary<Fix<M, A>>) {}
}
