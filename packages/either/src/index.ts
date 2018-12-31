import { isNot, id } from "@bonsai/core"

abstract class EitherOps<A, B> {}

declare const type: unique symbol

declare const enum RightType {}
declare const enum LeftType {}

export class Right<A> extends EitherOps<never, A> {
  private readonly [type]!: RightType

  unbox(): A {
    return this.value
  }

  constructor(readonly value: A) {
    super()
  }
}

declare const right1: Right<number>

type KeyLike = string | number | symbol

export class Left<A> extends EitherOps<A, never> {
  // Uniqueness marker
  private readonly [type]!: LeftType

  unbox(): A {
    return this.value
  }

  constructor(readonly value: A) {
    super()
  }
}

type Either<L, R> = Left<L> | Right<R>

declare const e: Left<string>

async function x() {
  const z = await Promise.resolve(2).then(Either.right, (x: Error) => Either.left(x))
}

namespace Either {
  export function pure<R>(value: R): Either<never, R> {
    return right(value)
  }

  export function right<R>(value: R): Either<never, R> {
    return new Right(value)
  }

  export function left<L>(value: L): Either<L, never> {
    return new Left(value)
  }
}

export default Either
