export interface Node {
  col: number
  distance: number
  fDistance: number
  gDistance: number
  hDistance: number
  isEnd: boolean
  isStart: boolean
  isVisited: boolean
  isWall: boolean
  prevNode: Node | null
  row: number
}
