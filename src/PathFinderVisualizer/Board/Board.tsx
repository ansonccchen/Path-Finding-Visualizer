import React, { useEffect, useState } from "react"
import { Grid } from "@material-ui/core"
import { Div } from "../../components"
import { colors } from "../../theme"
import { Node } from "../../types/node"
import NodeView from "./NodeView"
import { dijkstra } from "../../algorithms"

interface Props {
  board: Node[][]
  DEFAULT_END_COL: number
  DEFAULT_END_ROW: number
  DEFAULT_START_COL: number
  DEFAULT_START_ROW: number
  hasVisualized: boolean
  isVisualizing: boolean
  nodeRefs: any
  setBoard: React.Dispatch<any>
}

const Board: React.FC<Props> = ({
  board,
  DEFAULT_END_COL,
  DEFAULT_END_ROW,
  DEFAULT_START_COL,
  DEFAULT_START_ROW,
  hasVisualized,
  isVisualizing,
  nodeRefs,
  setBoard,
}) => {
  useEffect(() => {
    const nodes = []
    for (let row = 0; row < 10; row++) {
      const _row = []
      for (let col = 0; col < 10; col++) {
        const node: Node = {
          col,
          distance: Infinity,
          isEnd: row === DEFAULT_END_ROW && col === DEFAULT_END_COL,
          isStart: row === DEFAULT_START_ROW && col === DEFAULT_START_COL,
          isVisited: false,
          isWall: false,
          prevNode: null,
          row,
        }
        _row.push(node)
      }
      nodes.push(_row)
    }
    setBoard(nodes)
  }, [
    DEFAULT_END_COL,
    DEFAULT_END_ROW,
    DEFAULT_START_COL,
    DEFAULT_START_ROW,
    setBoard,
  ])
  const [isMovingStartNode, setIsMovingStartNode] = useState<boolean>(false)
  const [isMovingEndNode, setIsMovingEndNode] = useState<boolean>(false)
  const [startPosition, setStartPosition] = useState<number[]>([
    DEFAULT_START_ROW,
    DEFAULT_START_COL,
  ])
  const [endPosition, setEndPosition] = useState<number[]>([
    DEFAULT_END_ROW,
    DEFAULT_END_COL,
  ])

  const redoAlgorithm = () => {
    if (isVisualizing || !hasVisualized) return
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
        if (!node.isWall) {
          nodeRefs.current[`${node.row}-${node.col}`].style.background =
            colors.lightShade
        }
      }
    }
    const { visitedNodesInOrder, shortestPath } = dijkstra({
      startNode,
      endNode,
      board,
    })
    animateInstantAlgorithm({ visitedNodesInOrder, shortestPath })
  }

  const animateInstantAlgorithm = async ({
    visitedNodesInOrder,
    shortestPath,
  }: {
    visitedNodesInOrder: Node[]
    shortestPath: Node[]
  }) => {
    for (let i = 1; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        if (!shortestPath[shortestPath.length - 1].isEnd) return
        for (let j = 1; j < shortestPath.length; j++) {
          nodeRefs.current[
            `${shortestPath[j].row}-${shortestPath[j].col}`
          ].style.backgroundColor = colors.lightAccent
        }
      } else {
        nodeRefs.current[
          `${visitedNodesInOrder[i].row}-${visitedNodesInOrder[i].col}`
        ].style.backgroundColor = colors.darkAccent
      }
    }
  }

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
