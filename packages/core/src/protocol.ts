function protocol<T>() {
  return <U extends T>(t: U): U => t
}
