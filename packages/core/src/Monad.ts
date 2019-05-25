import { Kind1, Of, TypeFamily } from "tshkt"
import { Applicative } from "./Applicative"

export interface Monad<F, A> extends Applicative<F, A> {
  flatMap<B>(this: Of<F, A>, f: (a: A) => Of<F, B>): Of<F, B>
}

export interface IsMonad<F> extends TypeFamily<Kind1> {
  (): Monad<F, this[0]>
}
