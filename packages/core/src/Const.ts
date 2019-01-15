import { Kind2, Type2 } from "@bonsai/kinds"
import { FunctorSyntax } from "./Functor"

export class Const<A, B> extends FunctorSyntax<Kind2.λ<Const$kind, A>> {
  constructor(private value: A) {
    super(Const)
  }

  get(): A {
    return this.value
  }
}

export namespace Const {
  export function map<A, B, C>(fa: Const<A, B>, f: (b: B) => C): Const<A, C> {
    return new Const(fa.get())
  }
}

// #region HKT boilerplate
declare const enum Const$witness {}
export interface Const$kind extends Kind2<Const$witness> {
  [Kind2.refine]: [this] extends [Type2<Const$kind, infer A, infer B>] ? Const<A, B> : never
}
export interface Const<A, B> extends Type2<Const$kind, A, B> {}
// #endregion
