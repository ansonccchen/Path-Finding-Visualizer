import React from "react"
import { Grid } from "@material-ui/core"
import { Div } from "../components"
import { colors } from "../theme"

interface Props {
  isStart: boolean
  isEnd: boolean
  row: number
  col: number
}

const Node: React.FC<Props> = ({ isStart, isEnd, row, col }) => {
  return (
    <Grid item xs>
      <Div
        backgroundColor={isStart ? colors.main : isEnd ? "green" : "white"}
        borderColor="#cceaf0"
        borderWidth={0.5}
        h={32}
      >
        <text>{col}</text>
      </Div>
    </Grid>
  )
}

export default Node
