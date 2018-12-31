declare const enum GetterKind {}

export class Getter<S, A> {
  private [Symbol.species]!: GetterKind

  constructor(readonly get: (s: S) => A) {}
}
