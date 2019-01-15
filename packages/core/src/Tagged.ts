declare const witness: unique symbol

interface Tagging<T> {
  [witness]: T
}

export type Tagged<T, U = {}> = Tagging<T> & U
