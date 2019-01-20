import { IO } from "@bonsai/io"
import { Option } from "@bonsai/option"
import { Kind1, Ap, Functor, Traversable, List } from "@bonsai/core"

function mapVoid<F extends Kind1, A>(F: Functor<F>, fa: Ap<F, A>): Ap<F, void> {
  const { map } = Functor(F)
  return map(fa, () => undefined)
}

const printLine = (message: string) => new IO(() => console.log(message))
const abort = (message: string) => mapVoid(IO, printLine(message).flatMap(() => process.exit(128)))

const maybes = new List([Option.pure(2), Option.pure(3), Option.pure(4)])

function runListExample(): IO<void> {
  const { sequence } = Traversable(List)
  const maybes2 = sequence(Option, maybes)
  return maybes2.fold(xs => printLine(Array.from(xs).join(",")), () => abort("Got None! :("))
}

function main(): IO<void> {
  return runListExample()
}

main().unsafeRun()
