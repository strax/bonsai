type Key = string | number | symbol

type Labeled<T extends Key, U> = [T, U]
type RecordLike = Record<Key, any>

type Refine<T> = [T] extends [T] ? T : never

type MkRecord<K extends Key, V> = Refine<{ [_ in K]: V }>

type Rows<T extends RecordLike> = T extends T
  ? (Keys<T> extends infer K ? (K extends Key ? MkRecord<K, T[K]> : never) : never)
  : never

type Keys<T extends RecordLike> = T extends T ? keyof T : never

type z = Rows<{ a: true; b: string } | { c: boolean }>
