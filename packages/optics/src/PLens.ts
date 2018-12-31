declare const witness: unique symbol

function unsafeCoerce<A, B>(a: A): B {
  return (a as unknown) as B
}

abstract class App<F, A> {
  [witness]: [F, A]
}

abstract class App2<F, A, B> {
  [witness]: [F, A, B]
}

export abstract class Profunctor<P> {
  abstract dimap<A, B, AA, BB>(p: App2<P, A, B>, f: (aa: AA) => A, g: (b: B) => BB): App2<P, AA, BB>
}

export namespace Profunctor {
  export const instance: unique symbol = Symbol("Profunctor.instance")

  export function the<P>(x: HasProfunctor<P>): Profunctor<P> {
    return x[Profunctor.instance]
  }

  export function dimap<P, A, B, AA, BB>(
    p: HasProfunctor<P> & App2<P, A, B>,
    f: (aa: AA) => A,
    g: (b: B) => BB
  ): App2<P, AA, BB> {
    return the(p).dimap(p, f, g)
  }
}

interface HasProfunctor<F> {
  [Profunctor.instance]: Profunctor<F>
}

declare const enum FunctionKind {}

interface Fn1<A, B> extends Function, App2<FunctionKind, A, B> {
  (a: A): B
  [Profunctor.instance]: Profunctor<FunctionKind>
}

namespace Fn1 {
  export function fix<A, B>(fn: App2<FunctionKind, A, B>): Fn1<A, B> {
    return fn as Fn1<A, B>
  }

  export function wrap<A, B>(f: (a: A) => B): Fn1<A, B> {
    const wrapper = function(a: A): B {
      return f(a)
    } as Fn1<A, B>
    wrapper[Profunctor.instance] = undefined as any
    return wrapper
  }
}

class Forget<R, A, B> {
  constructor(private f: (a: A) => R) {}

  run(a: A): R {
    return this.f(a)
  }

  dimap<AA, BB>(f: (aa: AA) => A, g: (b: B) => BB): Forget<R, AA, BB> {
    return new Forget(aa => this.run(f(aa)))
  }
}

type Fun1<A, B> = (a: A) => B

type Lens<S, T, A, B> = (f: (a: A) => B) => ((s: S) => T)
