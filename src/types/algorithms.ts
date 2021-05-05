export const algoSpeedsArray = ["slow", "normal", "fast"] as const
export type AlgoSpeed = typeof algoSpeedsArray[number]
export interface AlgoSpeeds {
  slow: number
  normal: number
  fast: number
}
