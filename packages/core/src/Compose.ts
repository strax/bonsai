import { Kind1, Kind3, Type3, Kind2, Fix } from "@bonsai/kinds"
import { Functor, FunctorSyntax } from "./Functor"

type λ<F, G> = Kind2.λ<Kind3.λ<Compose$kind, F>, G>

export class Compose<F extends Kind1, G extends Kind1, A> extends FunctorSyntax<λ<F, G>> {
  constructor(private F: Functor<F>, private G: Functor<G>) {
    super(Compose)
  }

  getCompose(): Fix<F, Fix<G, A>> {
    throw new Error("not implemented")
  }
}

export namespace Compose {}

// #region Type constructor * -> * -> * -> *
declare const enum Compose$witness {}
interface Compose$kind extends Kind3<Compose$witness> {
  [Kind3.refine]: this extends Compose<infer F, infer G, infer A> ? Compose<F, G, A> : never
}
export interface Compose<F extends Kind1, G extends Kind1, A> extends Type3<Compose$kind, F, G, A> {}
// #region
