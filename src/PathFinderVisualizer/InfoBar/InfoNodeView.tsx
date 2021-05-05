import React from "react"
import {
  Typography,
  Tooltip,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core"
import { Div } from "../../components"
import { colors } from "../../theme"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tooltip: {
      maxWidth: 320,
      fontSize: 16,
    },
    tooltipSmall: {
      maxWidth: 232,
      fontSize: 16,
    },
  })
)

interface Props {
  caption?: any
  displayElement: any
  isSmallTooltipWidth?: boolean
  label: string
  tooltip?: string
}

const InfoNodeView: React.FC<Props> = ({
  caption,
  displayElement,
  isSmallTooltipWidth,
  label,
  tooltip,
}) => {
  const classes = useStyles()
  return (
    <Div alignItemsCenter>
      <Tooltip
        title={tooltip || ""}
        placement="top-start"
        arrow
        classes={{
          tooltip: isSmallTooltipWidth ? classes.tooltipSmall : classes.tooltip,
        }}
      >
        <Div
          alignItemsCenter
          backgroundColor={colors.lightShade}
          borderRadius={4}
          h={64}
          justifyContentCenter
          mv={8}
          w={64}
        >
          {displayElement}
        </Div>
      </Tooltip>
      <Div w={120} alignItemsCenter>
        <Typography style={styles.text} align="center">
          {label}
        </Typography>
        {caption}
      </Div>
    </Div>
  )
}

const styles = {
  text: {
    color: colors.lightShade,
    fontWeight: 600,
  },
}

export default React.memo(InfoNodeView)
