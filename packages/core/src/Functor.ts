import { Kind1, Fix, HasKind1, ToKind1 } from "./kinds"

export interface Functor<F extends Kind1> {
  map<A, B>(fa: Fix<F, A>, f: (a: A) => B): Fix<F, B>
}

export interface FunctorInstance<F extends Kind1> {
  [Functor.instance]: Functor<F>
}

export interface IsFunctor extends Kind1 {
  [Functor.instance]: Functor<this>
}

type ToFunctor<T> = [T] extends [FunctorInstance<infer F>] ? Functor<F> : never

// export function Functor<T extends FunctorInstance<any>>(F: T): ToFunctor<T> {
//   return F[Functor.instance] as ToFunctor<T>
// }
export function Functor<F extends IsFunctor>(F: HasKind1<F>): Functor<F> {
  return F[Kind1.kind][Functor.instance]
}

export namespace Functor {
  export const instance = Symbol("Functor.instance")
}

type NoInfer<T> = T & { [K in keyof T]: T[K] }

export function fmap<F extends IsFunctor, A, B>(fa: Fix<F, A>, f: (a: A) => B): Fix<F, B> {
  return Functor<F>(fa).map(fa, f)
}
