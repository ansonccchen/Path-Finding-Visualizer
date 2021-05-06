import { colors } from "../../theme"
import { Node } from "../../types/node"

interface Props {
  board: Node[][]
  DEFAULT_END_COL: number
  DEFAULT_END_ROW: number
  DEFAULT_START_COL: number
  DEFAULT_START_ROW: number
  nodeRefs: any
}

export const preSetupAlgorithm = ({
  board,
  DEFAULT_END_COL,
  DEFAULT_END_ROW,
  DEFAULT_START_COL,
  DEFAULT_START_ROW,
  nodeRefs,
}: Props) => {
  let startNode: Node | null = board?.[DEFAULT_START_ROW]?.[DEFAULT_START_COL]
  let endNode: Node | null = board?.[DEFAULT_END_ROW]?.[DEFAULT_END_COL]
  for (const row of board) {
    for (const node of row) {
      if (node.isStart) {
        startNode = node
      } else if (node.isEnd) {
        endNode = node
      }
    }
  }
  for (const row of board) {
    for (const node of row) {
      node.prevNode = null
      node.isVisited = false
      node.distance = Infinity
      node.fDistance = Infinity
      node.gDistance = Infinity
      node.hDistance = Infinity
      if (!node.isWall) {
        nodeRefs.current[`${node.row}-${node.col}`].style.background =
          colors.lightShade
      }
    }
  }
  return { startNode, endNode }
}
