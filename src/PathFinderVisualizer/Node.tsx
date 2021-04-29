import React from "react"
import { Grid } from "@material-ui/core"
import { Div } from "../components"
import { colors } from "../theme"
import { useWindowDimensions } from "../hooks"

interface Props {
  isStart: boolean
  isEnd: boolean
  row: number
  col: number
}

const Node: React.FC<Props> = ({ isStart, isEnd, row, col }) => {
  const { width } = useWindowDimensions()

  return (
    <Grid item>
      <Div
        backgroundColor={isStart ? colors.main : isEnd ? "green" : "white"}
        borderColor="black"
        borderWidth={0.5}
        h={50}
        w={(1440 + 72) / 50}
      >
        <text>
          {row}:{col}
        </text>
      </Div>
    </Grid>
  )
}

export default Node
