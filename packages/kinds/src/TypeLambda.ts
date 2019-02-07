import Tuple from "@bonsai/tuples"
import { Type, Kind, Refine } from "./kinds"

type ReplaceTypeHoles$Helper<T, Subs extends Tuple> = T extends [unknown, Tuple]
  ? (Subs extends Tuple.NE
      ? {
          [K in keyof T]: K extends "0"
            ? (T[K] extends _ ? Tuple.Head<Subs> : T[K])
            : ReplaceTypeHoles<T[1], T[0] extends _ ? Tuple.Tail<Subs> : Subs>
        }
      : T)
  : never

// Given an argument list T and substitutions Subs,
// replaces type holes (_) from left to right with the values from Subs.
// NOTE: If there are fewer type holes than substitutions, unapplied substitutions are discarded.
type ReplaceTypeHoles<T extends Tuple, Subs extends Tuple> = T extends Tuple.NE
  ? Tuple.FromNested<ReplaceTypeHoles$Helper<Tuple.ToNested<T>, Subs>>
  : T

type ReplaceValues<T extends Tuple, From, To> = { [I in keyof T]: T[I] extends From ? To : T[I] }

// #region Type hole marker
declare const TypeHoleMarker: unique symbol
type TypeHoleMarker = typeof TypeHoleMarker
export interface _ {
  [TypeHoleMarker]: TypeHoleMarker
}
// #endregion

declare const enum λ$witness {}

export interface λ<T extends Type<any, any>> {
  // The arity of this type lambda is equal to the number of its type holes
  [Kind.arity]: Tuple.Count<Type.ToArgs<T>, _>
  [Kind.witness]: λ$witness
  [Type.witness]: [Type.ToKind<T>, ReplaceValues<Type.ToArgs<T>, _, unknown>]
  [Kind.refine]: this extends Type<λ<T>, infer Args> //
    ? Refine<Type<Type.ToKind<T>, ReplaceTypeHoles<Type.ToArgs<T>, Args>>> // ? ReplaceTypeHoles<T[Type.witness][1], Args>
    : never
}

export type Lambda<T extends Type<any, any>> = λ<T>
