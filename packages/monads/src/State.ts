import { FunctorSyntax, fmap } from "@bonsai/core"
import { Kind2, Type2 } from "@bonsai/kinds"

export class State<S, A> extends FunctorSyntax<Kind2.λ<State$kind>> {
  constructor(private f: (s: S) => [A, S]) {
    super(State)
  }

  run(s: S): [A, S] {
    return this.f(s)
  }

  eval(s: S): A {
    return this.f(s)[0]
  }

  exec(s: S): S {
    return this.f(s)[1]
  }
}

declare const s: State<void, number>

new State<void, number>(() => [2, undefined as void]).map(() => 2)

export namespace State {
  export function map<S, A, B>(sa: State<S, A>, f: (a: A) => B): State<S, B> {
    return new State(s0 => {
      const [a, s1] = sa.run(s0)
      return [f(a), s1]
    })
  }
}

// #region Boilerplate
declare const enum State$witness {}

interface State$kind extends Kind2<State$witness> {
  [Kind2.refine]: this extends Type2<State$kind, infer S, infer A> ? State<S, A> : never
}

export interface State<S, A> extends Type2<State$kind, S, A> {}
// #endregion
