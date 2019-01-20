import Tuple from "@bonsai/tuples"
import { Type, Kind, Refine } from "./kinds"

type Eq<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false

// Given an argument list T and substitutions Subs,
// replaces type holes (_) from left to right with the values from Subs.
// NOTE: If there are fewer type holes than substitutions, unapplied substitutions are discarded.
// FIXME: Bypasses compiler recursion checks, check if this can be done more appropriately
type ReplaceTypeHoles<
  T extends Tuple,
  Subs extends Tuple,
  Acc extends Tuple = [],
  K extends string = ""
> = T extends Tuple.NE
  ? {
      [I in K]: Subs extends Tuple.NE
        ? T[0] extends _
          ? _ extends T[0]
            ? ReplaceTypeHoles<Tuple.Tail<T>, Tuple.Tail<Subs>, Tuple.Append<Acc, Subs[0]>, K>
            : ReplaceTypeHoles<Tuple.Tail<T>, Subs, Tuple.Append<Acc, T[0]>, K>
          : ReplaceTypeHoles<Tuple.Tail<T>, Subs, Tuple.Append<Acc, T[0]>, K>
        : ReplaceTypeHoles<Tuple.Tail<T>, Subs, Tuple.Append<Acc, T[0]>, K>
    }[K]
  : Acc

type z = ReplaceTypeHoles<[_], [string, string]>

type ReplaceValues<T extends Tuple, From, To> = { [I in keyof T]: T[I] extends From ? To : T[I] }

export const enum _ {}

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

type test = Tuple.Count<[1, 2, 3], 2>

export type Lambda<T extends Type<any, any>> = λ<T>