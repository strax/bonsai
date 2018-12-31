import { PLens } from "./PLens"
import { PIso } from "./PIso"

export type Optic<S, T, A, B> = PIso<S, T, A, B> | PLens<S, T, A, B>
