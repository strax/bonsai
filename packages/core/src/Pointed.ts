import { Of } from "tshkt";

export interface Pointed<F> {
  of<A>(a: A): Of<F, A>
}