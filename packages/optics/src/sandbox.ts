declare function invoke<T, R>(func: (value: T) => R, value: {} & T): R

declare function test(value: { x: number }): number
declare function test2(value: string): number

invoke(x => x, 2) // Compiler error
test2("doo") // Compiler error

type ValueTypes = 1 | 2 | 3

export type RecordValues<Props extends string | number | symbol> = Record<Props, ValueTypes>

export function identityFn<RV extends RecordValues<keyof RV>>(value: RV) {
  return value
}

const recordValue: RecordValues<"asdf"> = {
  asdf: 2 //Autotcomplete works fine for the value here
}

identityFn({
  asdf: 2 //Autocomplete shows every type available
})
