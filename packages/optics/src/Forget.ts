import { Kind2, Type2 } from "@bonsai/core"
import { Kind3, Type3 } from "@bonsai/core/dist/kinds"
import { Profunctor, ProfunctorInstance } from "./Profunctor"
import { Strong } from "./Strong"

namespace ForgetProfunctor {
  export function dimap<R, A, B, AA, BB>(pab: Forget<R, A, B>, f: (aa: AA) => A, g: (b: B) => BB): Forget<R, AA, BB> {
    return new Forget(aa => pab.runForget(f(aa)))
  }
}

namespace ForgetStrong {
  export const profunctor = ForgetProfunctor

  export function first<R, A, B, C>(pab: Forget<R, A, B>): Forget<R, [A, C], [B, C]> {
    return new Forget(([a]) => pab.runForget(a))
  }

  export function second<R, A, B, C>(pab: Forget<R, A, B>): Forget<R, [C, A], [C, B]> {
    return new Forget(([, a]) => pab.runForget(a))
  }
}

export class Forget<R, A, B> {
  static [Profunctor.instance] = ForgetProfunctor
  static [Strong.instance] = ForgetStrong
  static [Kind3.kind] = Forget as Forget$Λ
  static [Kind2.kind] = (Forget as unknown) as Forget$λ<unknown>;

  [Kind3.kind]: Forget$Λ = Forget as Forget$Λ;
  [Kind2.kind]: Forget$λ<R> = (Forget as unknown) as Forget$λ<R>

  constructor(private f: (a: A) => R) {}

  runForget(a: A): R {
    return this.f(a)
  }
}

// #region Higher-kinded type support
// NOTE: Do not change this block

type Forget$Constructor = typeof Forget
declare const enum Forget$Witness {}

// Encodes Forget :: * -> * -> *
interface Forget$Λ extends Kind3<Forget$Witness>, Forget$Constructor {
  [Kind3.refine]: [this] extends [Type3<Forget$Λ, infer R, infer A, infer B>] ? Forget<R, A, B> : never
}

// Encodes Forget r :: * -> *
interface Forget$λ<R> extends Kind2<[Forget$Witness, R]>, Forget$Constructor {
  [Kind2.refine]: [this] extends [Type2<Forget$λ<infer R>, infer A, infer B>] ? Forget<R, A, B> : never
}

export interface Forget<R, A, B> extends Type2<Forget$λ<R>, A, B> {}
// #endregion
