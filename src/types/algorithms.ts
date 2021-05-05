export const algoSpeedsArray = ["slow", "normal", "fast"] as const
export type AlgoSpeed = typeof algoSpeedsArray[number]
export interface AlgoSpeeds {
  slow: number
  normal: number
  fast: number
}

export const algorithms = [
  "Dijkstra",
  "Depth-first Search",
  "Breadth-first Search",
  // 'A*',
] as const
export type Algorithms = typeof algorithms[number] | ""
