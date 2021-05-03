import React, { useEffect } from "react"
import { Grid } from "@material-ui/core"
import { Div } from "../../components"
import { colors } from "../../theme"
import { Node } from "../../types/node"
import NodeView from "./NodeView"

interface Props {
  board: Node[][]
  setBoard: React.Dispatch<any>
  isVisualizing: boolean
  nodeRefs: any
}

const DEFAULT_START_ROW = 12
const DEFAULT_START_COL = 15
const DEFAULT_END_ROW = 12
const DEFAULT_END_COL = 35

const Board: React.FC<Props> = ({
  board,
  setBoard,
  isVisualizing,
  nodeRefs,
}) => {
  useEffect(() => {
    const nodes = []
    for (let row = 0; row < 25; row++) {
      const _row = []
      for (let col = 0; col < 50; col++) {
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
  }, [setBoard])

  return (
    <Div
      backgroundColor={colors.darkShade}
      fill
      alignItemsCenter
      justifyContentCenter
      ph={40}
    >
      <Div style={styles.board} maxWidth={1704}>
        <Grid container>
          {board.map((row: Node[], rowIndex: number) => {
            return (
              <Grid container item key={String(rowIndex)}>
                {row.map((node: Node, columnIndex: number) => {
                  return (
                    <NodeView
                      key={String(columnIndex)}
                      node={node}
                      isVisualizing={isVisualizing}
                      nodeRefs={nodeRefs}
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
    boxShadow: `0px 4px 16px 0 rgba(0, 0, 0, 0.8)`,
  },
}

export default Board
