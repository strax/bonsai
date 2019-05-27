import { Of, TypeFamily, Kind1 } from "tshkt"
import { Functor } from "./Functor";
import { Pointed } from "./Pointed";

export interface Applicative<F, A> extends Functor<F, A> {
  constructor: Pointed<F>

  ap<B>(this: Of<F, A>, fab: Of<F, (a: A) => B>): Of<F, B>
}

export interface IsApplicative<F> extends TypeFamily<Kind1> {
  (): Applicative<F, this[0]>
}