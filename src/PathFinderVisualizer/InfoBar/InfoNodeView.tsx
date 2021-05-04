import React from "react"
import { Typography } from "@material-ui/core"
import { Div } from "../../components"
import { colors } from "../../theme"

interface Props {
  label: string
  displayElement: any
}

const InfoNodeView: React.FC<Props> = ({ label, displayElement }) => {
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
      <Div w={64} alignItemsCenter>
        <Typography style={styles.text} align="center">
          {label}
        </Typography>
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

export default InfoNodeView
