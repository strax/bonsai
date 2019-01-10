import "./array.types"

import { Traversable, Identity, sequence, traverse } from "@bonsai/core"

// These work:
Traversable(Array).sequence(Identity, [new Identity(2)])
Traversable(Array).traverse(Identity, [1, 2, 3], (a: number) => new Identity(a))

const g = traverse(Array, Identity, [2], x => new Identity(x))
// FIXME: Type refinement broken for the inner Applicative
const x = sequence(Array, Identity, [new Identity(2)])
