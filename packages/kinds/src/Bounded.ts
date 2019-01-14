export type Bounded<A, B> = A extends B ? A : (A & B)
