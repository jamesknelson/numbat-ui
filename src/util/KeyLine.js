export const Increments = {
  lg: 64,
  md: 64,
}

export function incrementalSize(size) {
  const increment = Increments.lg
  return Math.ceil(size / increment) * increment
}
