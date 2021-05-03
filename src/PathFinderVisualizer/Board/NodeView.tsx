import React from "react"
import { Grid } from "@material-ui/core"
import { Div } from "../../components"
import { colors } from "../../theme"
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked"

interface Props {
  isStart: boolean
  isEnd: boolean
  row: number
  col: number
  nodeRefs: any
  isWall: boolean
  onClick: () => void
  onMouseOver: () => void
  onMouseLeave: () => void
}

const NodeView: React.FC<Props> = ({
  isStart,
  isEnd,
  row,
  col,
  nodeRefs,
  isWall,
  onClick,
  onMouseOver,
  onMouseLeave,
}) => {
  return (
    <Grid item xs>
      <Div
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        backgroundColor={isWall ? colors.darkShade : colors.lightShade}
        ref={(r) => (nodeRefs.current[`${row}-${col}`] = r)}
        borderColor="#cceaf0"
        borderWidth={0.5}
        h={32}
        alignItemsCenter
        justifyContentCenter
      >
        {isStart && (
          <KeyboardArrowRightIcon style={{ color: colors.darkShade }} />
        )}
        {isEnd && (
          <RadioButtonCheckedIcon style={{ color: colors.darkShade }} />
        )}
      </Div>
    </Grid>
  )
}

export default NodeView
