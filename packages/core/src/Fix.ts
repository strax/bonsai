import { Type1 } from "./kinds";
import { Of } from "tshkt";

export class Fix<F extends Type1> {
  constructor(readonly value: Of<F, Fix<F>>) {}
}
