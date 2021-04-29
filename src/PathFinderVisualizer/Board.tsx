import React, { useState, useEffect } from "react"
import { Grid } from "@material-ui/core"
import { Div } from "../components"
import Node from "./Node"
import { colors } from "../theme"

interface Props {
  board: [[]]
  setBoard: React.Dispatch<any>
}

const Board: React.FC<Props> = ({ board, setBoard }) => {
  useEffect(() => {
    const nodes = []
    for (let row = 0; row < 15; row++) {
      const _row = []
      for (let col = 0; col < 45; col++) {
        const node = {
          col,
          distance: Infinity,
          isEnd: row === 7 && col === 40,
          isStart: row === 7 && col === 20,
          isVisited: false,
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
    <Div alignSelfCenter backgroundColor={colors.darkShade} fill>
      <Div p={40} w={1440}>
        <Grid container>
          {board.map((row: [], rowIndex: number) =>
            row.map(
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
                    key={String(columnIndex + rowIndex)}
                    col={col}
                    isEnd={isEnd}
                    isStart={isStart}
                    row={row}
                  />
                )
              }
            )
          )}
        </Grid>
      </Div>
    </Div>
  )
}

export default Board
