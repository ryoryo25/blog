export function union<T>(a: Set<T>, b: Set<T>) {
  const arrayA = Array.from(a)
  const arrayB = Array.from(b)
  return new Set([...arrayA, ...arrayB])
}