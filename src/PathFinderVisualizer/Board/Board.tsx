import React, { useEffect, useState, useCallback } from "react"
import { Grid } from "@material-ui/core"
import { Div } from "../../components"
import { colors } from "../../theme"
import { Node } from "../../types/node"
import NodeView from "./NodeView"
import { animateInstantAlgorithm } from "../../helpers/animations/animateInstantAlgorithm"
import { preSetupAlgorithm } from "../../helpers/algorithms/preSetupAlgorithm"
import { createBoard } from "../../helpers/board/createBoard"
import { Algorithms } from "../../types/algorithms"
import { selectAlgorithm } from "../../helpers/algorithms/selectAlgorithm"

interface Props {
  BOARD_COLS: number
  BOARD_ROWS: number
  board: Node[][]
  DEFAULT_END_COL: number
  DEFAULT_END_ROW: number
  DEFAULT_START_COL: number
  DEFAULT_START_ROW: number
  endPosition: number[]
  hasVisualized: boolean
  isVisualizing: boolean
  nodeRefs: React.MutableRefObject<{ [name: string]: any }>
  selectedAlgorithm: Algorithms
  setBoard: React.Dispatch<any>
  setEndPosition: React.Dispatch<React.SetStateAction<number[]>>
  setPathDistance: React.Dispatch<React.SetStateAction<number | "" | "N/A">>
  setStartPosition: React.Dispatch<React.SetStateAction<number[]>>
  setUnvisitedCount: React.Dispatch<React.SetStateAction<number>>
  setVisitedDistance: React.Dispatch<React.SetStateAction<number | "" | "N/A">>
  startPosition: number[]
  wallCountRef: React.MutableRefObject<{ [name: string]: any } | null>
}

const Board: React.FC<Props> = ({
  BOARD_COLS,
  BOARD_ROWS,
  board,
  DEFAULT_END_COL,
  DEFAULT_END_ROW,
  DEFAULT_START_COL,
  DEFAULT_START_ROW,
  endPosition,
  hasVisualized,
  isVisualizing,
  nodeRefs,
  selectedAlgorithm,
  setBoard,
  setEndPosition,
  setPathDistance,
  setStartPosition,
  setUnvisitedCount,
  setVisitedDistance,
  startPosition,
  wallCountRef,
}) => {
  useEffect(() => {
    const nodes = createBoard({
      BOARD_COLS,
      BOARD_ROWS,
      DEFAULT_END_COL,
      DEFAULT_END_ROW,
      DEFAULT_START_COL,
      DEFAULT_START_ROW,
      nodeRefs,
    })
    setBoard(nodes)
  }, [
    BOARD_COLS,
    BOARD_ROWS,
    DEFAULT_END_COL,
    DEFAULT_END_ROW,
    DEFAULT_START_COL,
    DEFAULT_START_ROW,
    nodeRefs,
    setBoard,
  ])

  const [isMovingStartNode, setIsMovingStartNode] = useState<boolean>(false)
  const [isMovingEndNode, setIsMovingEndNode] = useState<boolean>(false)

  const redoAlgorithm = useCallback(() => {
    if (isVisualizing || !hasVisualized) return
    const { startNode, endNode } = preSetupAlgorithm({
      board,
      DEFAULT_END_COL,
      DEFAULT_END_ROW,
      DEFAULT_START_COL,
      DEFAULT_START_ROW,
      nodeRefs,
    })
    const { visitedNodesInOrder, shortestPath } = selectAlgorithm({
      selectedAlgorithm,
      board,
      endNode,
      startNode,
    })
    setUnvisitedCount(BOARD_COLS * BOARD_ROWS - visitedNodesInOrder.length + 1)
    setVisitedDistance(visitedNodesInOrder.length - 1)
    if (shortestPath.length >= 2 && shortestPath[shortestPath.length - 1].isEnd)
      setPathDistance(shortestPath.length - 1)
    else setPathDistance("N/A")

    animateInstantAlgorithm({ visitedNodesInOrder, shortestPath, nodeRefs })
  }, [
    BOARD_COLS,
    BOARD_ROWS,
    DEFAULT_END_COL,
    DEFAULT_END_ROW,
    DEFAULT_START_COL,
    DEFAULT_START_ROW,
    board,
    hasVisualized,
    isVisualizing,
    nodeRefs,
    selectedAlgorithm,
    setPathDistance,
    setUnvisitedCount,
    setVisitedDistance,
  ])

  return (
    <Div
      backgroundColor={colors.lightShade}
      fill
      alignItemsCenter
      justifyContentCenter
      ph={40}
      pv={16}
    >
      <Div style={styles.board} maxWidth={1704}>
        <Grid container>
          {board.map((row: Node[], rowIndex: number) => {
            return (
              <Grid container item key={String(rowIndex)}>
                {row.map((node: Node, columnIndex: number) => {
                  return (
                    <NodeView
                      endPosition={endPosition}
                      isMovingEndNode={isMovingEndNode}
                      isMovingStartNode={isMovingStartNode}
                      isVisualizing={isVisualizing}
                      key={String(columnIndex)}
                      node={node}
                      nodeRefs={nodeRefs}
                      redoAlgorithm={redoAlgorithm}
                      setEndPosition={setEndPosition}
                      setIsMovingEndNode={setIsMovingEndNode}
                      setIsMovingStartNode={setIsMovingStartNode}
                      setStartPosition={setStartPosition}
                      startPosition={startPosition}
                      wallCountRef={wallCountRef}
                    />
                  )
                })}
              </Grid>
            )
          })}
        </Grid>
      </Div>
    </Div>
  )
}

const styles = {
  board: {
    boxShadow: `0 4px 16px 0 rgba(0, 0, 0, 0.3)`,
  },
}

export default Board
