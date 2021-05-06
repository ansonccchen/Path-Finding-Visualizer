import { colors } from "../../theme"
import { Node } from "../../types/node"

interface Props {
  BOARD_COLS: number
  BOARD_ROWS: number
  DEFAULT_END_COL: number
  DEFAULT_END_ROW: number
  DEFAULT_START_COL: number
  DEFAULT_START_ROW: number
  nodeRefs: React.MutableRefObject<{ [name: string]: any }>
}

export const createBoard = ({
  BOARD_COLS,
  BOARD_ROWS,
  DEFAULT_END_COL,
  DEFAULT_END_ROW,
  DEFAULT_START_COL,
  DEFAULT_START_ROW,
  nodeRefs,
}: Props) => {
  const nodes = []
  for (let row = 0; row < BOARD_ROWS; row++) {
    const _row = []
    for (let col = 0; col < BOARD_COLS; col++) {
      const node: Node = {
        col,
        distance: Infinity,
        fDistance: Infinity,
        gDistance: Infinity,
        hDistance: Infinity,
        isEnd: row === DEFAULT_END_ROW && col === DEFAULT_END_COL,
        isStart: row === DEFAULT_START_ROW && col === DEFAULT_START_COL,
        isVisited: false,
        isWall: false,
        prevNode: null,
        row,
      }
      if (nodeRefs.current[`${row}-${col}`]) {
        nodeRefs.current[`${row}-${col}`].style.background = colors.lightShade
        nodeRefs.current[`${node.row}-${node.col}`].classList.remove(
          "node-shortest-path",
          "node-visited"
        )
      }
      _row.push(node)
    }
    nodes.push(_row)
  }
  return nodes
}
