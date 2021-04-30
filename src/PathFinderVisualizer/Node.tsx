import React from "react"
import { Grid } from "@material-ui/core"
import { Div } from "../components"
import { colors } from "../theme"

interface Props {
  isStart: boolean
  isEnd: boolean
  row: number
  col: number
  nodeRefs: any
}

const Node: React.FC<Props> = ({ isStart, isEnd, row, col, nodeRefs }) => {
  return (
    <Grid item xs>
      <Div
        backgroundColor={
          isStart
            ? colors.lightAccent
            : isEnd
            ? colors.darkAccent
            : colors.lightShade
        }
        ref={(r) => (nodeRefs.current[`${row}-${col}`] = r)}
        borderColor="#cceaf0"
        borderWidth={0.5}
        h={32}
      ></Div>
    </Grid>
  )
}

export default React.memo(Node)
