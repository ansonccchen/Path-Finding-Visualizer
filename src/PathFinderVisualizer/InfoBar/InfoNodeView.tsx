import React from "react"
import { Typography } from "@material-ui/core"
import { Div } from "../../components"
import { colors } from "../../theme"

interface Props {
  label: string
  displayElement: any
  caption?: any
}

const InfoNodeView: React.FC<Props> = ({ label, displayElement, caption }) => {
  return (
    <Div alignItemsCenter>
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
