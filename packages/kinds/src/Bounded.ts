export type Bounded<A, B> = A extends A ? (A extends B ? A : (A & B)) : never
