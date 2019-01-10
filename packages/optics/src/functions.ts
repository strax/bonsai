import { Kind2, Type2 } from "@bonsai/core"
import { Profunctor, ProfunctorInstance } from "./Profunctor"
import { StrongInstance, Strong } from "./Strong"

declare const enum FunctionWitness {}

interface Function2Kind
  extends Kind2<FunctionWitness>,
    ProfunctorInstance<Function2Kind>,
    StrongInstance<Function2Kind> {
  [Kind2.refine]: [this] extends [Type2<Function2Kind, infer A, infer B>] ? Function2<A, B> : never
}

interface Function2<A, B> extends Type2<Function2Kind, A, B> {
  [Kind2.kind]: Function2Kind
  (a: A): B
}

export function Function2<A, B>(f: (a: A) => B): Function2<A, B> {
  return f as Function2<A, B>
}

// @ts-ignore
Function[Profunctor.instance] = FunctionProfunctor
// @ts-ignore
Function[Strong.instance] = FunctionStrong

namespace FunctionProfunctor {
  export function dimap<A1, B1, A2, B2>(f: (a1: A1) => B1, g: (a2: A2) => A1, h: (b1: B1) => B2): (a2: A2) => B2 {
    return a2 => h(f(g(a2)))
  }
}

namespace FunctionStrong {
  export function first<A, B, C>(f: (a: A) => B): (ac: [A, C]) => [B, C] {
    return ([a, c]) => [f(a), c]
  }

  export function second<A, B, C>(f: (a: A) => B): (ca: [C, A]) => [C, B] {
    return ([c, a]) => [c, f(a)]
  }
}

declare global {
  interface Function {
    compose<A, B, C>(this: (b: B) => C, other: (b: A) => B): (a: A) => C
  }
}

Function.prototype.compose = function compose<A extends [any], B, C>(
  this: (b: B) => C,
  other: (...args: A) => B
): (...args: A) => C {
  return (...args) => this(other(...args))
}
