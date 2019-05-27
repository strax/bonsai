import { Of } from "tshkt";
import { Type1 } from "./kinds";

/**
 * Defines a natural transformation F ~> G
 */
export interface Nat<F extends Type1, G extends Type1> {
  <A>(fa: Of<F, A>): Of<G, A>
}
