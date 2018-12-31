export function id<A>(a: A) {
  return a
}

export function constant<A>(a: A): <B = unknown>(b: B) => A {
  return _ => a
}

// #region Compose

export function compose2<A, B, R>(f: (b: B) => R, g: (a: A) => B): (a: A) => R {
  return a => f(g(a))
}

// #endregion
