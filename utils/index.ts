export function range(count: number, start: number = 0) {
  return Array(count)
    .fill(null)
    .map((_, i) => i + start)
}
