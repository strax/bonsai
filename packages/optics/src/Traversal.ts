enum FunListKind {
  Done,
  More
}

interface Done<B> {
  kind: FunListKind.Done
  value: B
}

interface More<A, B> {
  kind: FunListKind.More
  value: FunList<A, (a: A) => B>
}

type FunList<A, B> = Done<B> | More<A, B>
