import React from "react"
import { Grid } from "@material-ui/core"
import { Div } from "../../components"
import { colors } from "../../theme"
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked"

interface Props {
  col: number
  isEnd: boolean
  isStart: boolean
  isWall: boolean
  nodeRefs: any
  onClick?: () => void
  onMouseLeave?: () => void
  onMouseOver?: () => void
  onMouseDown?: () => void
  onMouseUp?: () => void
  onMouseEnter?: () => void
  row: number
}

const GridNode: React.FC<Props> = ({
  col,
  isEnd,
  isStart,
  isWall,
  nodeRefs,
  onClick,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  onMouseOver,
  onMouseEnter,
  row,
}) => {
  return (
    <Grid item xs>
      <Div
        alignItemsCenter
        backgroundColor={
          isWall
            ? isStart || isEnd
              ? colors.lightShade
              : colors.darkShade
            : colors.lightShade
        }
        borderColor="#cceaf0"
        borderWidth={0.5}
        h={32}
        justifyContentCenter
        onClick={onClick}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseEnter={onMouseEnter}
        ref={(r) => (nodeRefs.current[`${row}-${col}`] = r)}
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

export default React.memo(GridNode)
