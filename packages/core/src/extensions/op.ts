export function op<T extends object, K extends keyof T>(target: T, prop: K) {
  return (source: any, method: string | symbol, descriptor: TypedPropertyDescriptor<T[K]>) => {
    Reflect.defineProperty(target, prop, {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source[method]
    })
  }
}
