import React from "react"
import { Typography, Button } from "@material-ui/core"
import { Div } from "../../components"
import { colors } from "../../theme"
import { Node } from "../../types/node"
import { createBoard } from "../../helpers/board/createBoard"

interface Props {
  BOARD_COLS: number
  BOARD_ROWS: number
  board: Node[][]
  DEFAULT_END_COL: number
  DEFAULT_END_ROW: number
  DEFAULT_START_COL: number
  DEFAULT_START_ROW: number
  isVisualizing: boolean
  nodeRefs: React.MutableRefObject<{ [name: string]: any }>
  setBoard: React.Dispatch<any>
  setEndPosition: React.Dispatch<React.SetStateAction<number[]>>
  setHasVisualized: React.Dispatch<React.SetStateAction<boolean>>
  setPathDistance: React.Dispatch<React.SetStateAction<number | "" | "N/A">>
  setStartPosition: React.Dispatch<React.SetStateAction<number[]>>
  setUnvisitedCount: React.Dispatch<React.SetStateAction<number>>
  setVisitedDistance: React.Dispatch<React.SetStateAction<number | "" | "N/A">>
  wallCountRef: React.MutableRefObject<{ [name: string]: any } | null>
}

const ClearButtons: React.FC<Props> = ({
  BOARD_COLS,
  BOARD_ROWS,
  board,
  DEFAULT_END_COL,
  DEFAULT_END_ROW,
  DEFAULT_START_COL,
  DEFAULT_START_ROW,
  isVisualizing,
  nodeRefs,
  setBoard,
  setEndPosition,
  setHasVisualized,
  setPathDistance,
  setStartPosition,
  setUnvisitedCount,
  setVisitedDistance,
  wallCountRef,
}) => {
  const resetBoard = () => {
    const nodes = createBoard({
      BOARD_COLS,
      BOARD_ROWS,
      DEFAULT_END_COL,
      DEFAULT_END_ROW,
      DEFAULT_START_COL,
      DEFAULT_START_ROW,
      nodeRefs,
    })
    setStartPosition([DEFAULT_START_ROW, DEFAULT_START_COL])
    setEndPosition([DEFAULT_END_ROW, DEFAULT_END_COL])
    if (wallCountRef.current) {
      wallCountRef.current.count = 0
      wallCountRef.current.innerHTML = "Count: 0"
    }
    setUnvisitedCount(BOARD_COLS * BOARD_ROWS)
    setVisitedDistance("")
    setPathDistance("")
    setHasVisualized(false)
    setBoard(nodes)
  }
  const clearWalls = () => {
    for (const row of board) {
      for (const node of row) {
        if (node.isWall) {
          node.isWall = false
          nodeRefs.current[`${node.row}-${node.col}`].style.background =
            colors.lightShade
        }
      }
    }
    if (wallCountRef.current) {
      wallCountRef.current.count = 0
      wallCountRef.current.innerHTML = "Count: 0"
    }
  }

  return (
    <>
      <Button onClick={resetBoard} disabled={isVisualizing}>
        <Typography
          variant="h6"
          style={{
            color: isVisualizing ? colors.disabled : colors.main,
            fontWeight: 500,
          }}
        >
          Reset Board
        </Typography>
      </Button>
      <Div w={32} />
      <Button onClick={clearWalls} disabled={isVisualizing}>
        <Typography
          variant="h6"
          style={{
            color: isVisualizing ? colors.disabled : colors.main,
            fontWeight: 500,
          }}
        >
          Clear Walls
        </Typography>
      </Button>
    </>
  )
}

export default React.memo(ClearButtons)
