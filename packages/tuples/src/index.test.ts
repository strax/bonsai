declare const enum Pass {}

type Assert<T extends true> = Pass
type Eq<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false
