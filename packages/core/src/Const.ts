import { Kind2, Type2, Kind, Void, _, λ, Kind1 } from "@bonsai/kinds"
import { FunctorSyntax } from "./Functor"

export class Const<A, B> {
  constructor(private value: A) {}

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
  [Kind.refine]: this extends Type2<Const$kind, infer A, infer B> ? Const<A, B> : never
}
export interface Const<A, B> extends Type2<Const$kind, A, B> {}
// #endregion
