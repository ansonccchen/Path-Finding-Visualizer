import React from "react"
import { Div } from "../../components"
import { colors } from "../../theme"
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight"
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked"

import InfoNodeView from "./InfoNodeView"

interface Props {}

const InfoBar: React.FC<Props> = () => {
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
          label="Start"
        />
        <Div w={48} />
        <InfoNodeView
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
          label="End"
        />
        <Div w={48} />
        <InfoNodeView
          displayElement={
            <Div w={40} h={40} backgroundColor={colors.darkShade} />
          }
          label="Wall"
        />
        <Div w={48} />
        <InfoNodeView
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
          label="Unvisited"
        />
        <Div w={48} />
        <InfoNodeView
          displayElement={
            <Div w={40} h={40} backgroundColor={colors.darkAccent} />
          }
          label="Visited"
        />
        <Div w={48} />
        <InfoNodeView
          displayElement={
            <Div w={40} h={40} backgroundColor={colors.lightAccent} />
          }
          label="Shortest Path"
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
