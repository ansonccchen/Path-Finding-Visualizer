import React, { useState, useEffect } from "react"
import { Grid } from "@material-ui/core"
import { Div } from "../components"
import Node from "./Node"
import { colors } from "../theme"

interface Props {
  board: [[]]
  setBoard: React.Dispatch<any>
  nodeRefs: any
}

const Board: React.FC<Props> = ({ board, setBoard, nodeRefs }) => {
  useEffect(() => {
    const nodes = []
    for (let row = 0; row < 25; row++) {
      const _row = []
      for (let col = 0; col < 50; col++) {
        const node = {
          col,
          distance: Infinity,
          isEnd: row === 10 && col === 35,
          isStart: row === 10 && col === 15,
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
    <Div backgroundColor={colors.darkShade} fill>
      <Div p={40}>
        <Grid container>
          {board.map((row: [], rowIndex: number) => {
            return (
              <Grid container item key={String(rowIndex)}>
                {row.map(
                  (
                    node: {
                      isStart: boolean
                      isEnd: boolean
                      row: number
                      col: number
                    },
                    columnIndex: number
                  ) => {
                    const { isStart, isEnd, row, col } = node
                    return (
                      <Node
                        key={String(columnIndex)}
                        col={col}
                        isEnd={isEnd}
                        isStart={isStart}
                        nodeRefs={nodeRefs}
                        row={row}
                      />
                    )
                  }
                )}
              </Grid>
            )
          })}
        </Grid>
      </Div>
    </Div>
  )
}

export default Board
