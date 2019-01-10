type Assert<T extends true> = void

// @ts-ignore: 'infer' declarations are only permitted in the 'extends' clause of a conditional type.
type Brand<T, B> = infer _ extends B ? T : never

type FooT = Brand<"foo", string>

// @ts-ignore
export type z = unique symbol

function gen() {
  const enum A {}
  return (void 0 as unknown) as A
}
