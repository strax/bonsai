export function id<A>(a: A) {
  return a
}

export function constant<A>(a: A): <B = unknown>(b: B) => A {
  return _ => a
}
