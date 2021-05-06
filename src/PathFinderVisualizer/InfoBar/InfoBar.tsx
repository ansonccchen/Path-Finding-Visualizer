import React from "react"
import { Div } from "../../components"
import { colors } from "../../theme"
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked"
import { Typography } from "@material-ui/core"

import InfoNodeView from "./InfoNodeView"

interface Props {
  endPosition: number[]
  pathDistance: number | "" | "N/A"
  startPosition: number[]
  unvisitedCount: number
  visitedDistance: number | "" | "N/A"
  wallCountRef: React.MutableRefObject<{ [name: string]: any } | null>
}

const InfoBar: React.FC<Props> = ({
  endPosition,
  pathDistance,
  startPosition,
  unvisitedCount,
  visitedDistance,
  wallCountRef,
}) => {
  return (
    <Div
      row
      backgroundColor={colors.darkShade}
      pv={8}
      ph={24}
      justifyContentCenter
    >
      <Div maxWidth={1704} row fill>
        <InfoNodeView
          label="Start"
          tooltip="To move start position, click the start icon on the board and drag anywhere as desired"
          displayElement={
            <Div
              alignItemsCenter
              backgroundColor={colors.lightShade}
              borderColor="#cceaf0"
              borderWidth={2}
              h={40}
              justifyContentCenter
              w={40}
            >
              <KeyboardArrowRightIcon fontSize="large" style={styles.icon} />
            </Div>
          }
          caption={
            <Typography style={{ color: colors.lightShade }} variant="body2">
              Position: ({startPosition[1]},{startPosition[0]})
            </Typography>
          }
        />
        <Div w={48} />
        <InfoNodeView
          label="End"
          tooltip="To move end position, click the end icon on the board and drag anywhere as desired"
          displayElement={
            <Div
              alignItemsCenter
              backgroundColor={colors.lightShade}
              borderColor="#cceaf0"
              borderWidth={2}
              h={40}
              justifyContentCenter
              w={40}
            >
              <RadioButtonCheckedIcon fontSize="large" style={styles.icon} />
            </Div>
          }
          caption={
            <Typography style={{ color: colors.lightShade }} variant="body2">
              Position: ({endPosition[1]},{endPosition[0]})
            </Typography>
          }
        />
        <Div w={48} />
        <InfoNodeView
          label="Wall"
          tooltip="Click anywhere on the board to place/remove a wall"
          isSmallTooltipWidth
          displayElement={
            <Div w={40} h={40} backgroundColor={colors.darkShade} />
          }
          caption={
            <Typography
              ref={(r) => {
                if (
                  wallCountRef.current &&
                  Object.keys(wallCountRef.current).length === 0
                ) {
                  wallCountRef.current = r
                  if (wallCountRef.current) wallCountRef.current.count = 0
                }
              }}
              style={{ color: colors.lightShade }}
              variant="body2"
            >
              Count: {wallCountRef.current?.count ?? 0}
            </Typography>
          }
        />
        <Div w={48} />
        <InfoNodeView
          label="Unvisited"
          displayElement={
            <Div
              alignItemsCenter
              backgroundColor={colors.lightShade}
              borderColor="#cceaf0"
              borderWidth={2}
              h={40}
              justifyContentCenter
              w={40}
            />
          }
          caption={
            <Typography style={{ color: colors.lightShade }} variant="body2">
              Count: {unvisitedCount}
            </Typography>
          }
        />
        <Div w={48} />
        <InfoNodeView
          label="Visited"
          displayElement={
            <Div w={40} h={40} backgroundColor={colors.darkAccent} />
          }
          caption={
            <Typography style={{ color: colors.lightShade }} variant="body2">
              Distance: {visitedDistance}
            </Typography>
          }
        />
        <Div w={48} />
        <InfoNodeView
          label="Path"
          displayElement={
            <Div w={40} h={40} backgroundColor={colors.lightAccent} />
          }
          caption={
            <Typography style={{ color: colors.lightShade }} variant="body2">
              Distance: {pathDistance}
            </Typography>
          }
        />
      </Div>
    </Div>
  )
}

const styles = {
  icon: {
    color: colors.darkShade,
  },
}

export default React.memo(InfoBar)
