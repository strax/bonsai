import Either from "@bonsai/either"

type Key = string | number | symbol

type RecordLike = Record<Key, any>

type NonEmptyArray<A> = [A, ...A[]]

type Validator<T> = (input: unknown) => Either<unknown, T>

type Spec<T extends RecordLike> = { [K in keyof T]: Validator<T[K]> }

declare function object<T extends object>(spec: Spec<T>): Validator<T>

declare const number: Validator<number>
declare const string: Validator<string>
declare function constant<T>(tag: T): Validator<T>
declare function array<T>(values: Validator<T>): Validator<Array<T>>
declare function variant<T extends RecordLike>(values: T): Validator<T[keyof T]>

interface Input {
  user: {
    name: string
    age: number
  }
  karma: number
}

const v = object<Input>({
  karma: number,
  user: object({
    name: string,
    age: number
  })
})

const x = v("foo")
