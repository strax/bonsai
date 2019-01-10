import { IsFunctor, Fix, Const, fmap, Identity, constant, composeK, id, Fix2 } from "@bonsai/core"
import { IsProfunctor } from "./Profunctor"
import { IsStrong } from "./Strong"

export type PLens<S, T, A, B> = <P extends IsStrong>(pab: Fix2<P, A, B>) => Fix2<P, S, T>
export type Lens<S, A> = PLens<S, S, A, A>
