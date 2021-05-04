import React from "react"
import { Typography, Button } from "@material-ui/core"
import InfoIcon from "@material-ui/icons/Info"
import { Div } from "../../components"
import { colors } from "../../theme"

const Footer = () => {
  return (
    <Div justifyContentCenter backgroundColor={colors.lightShade} pb={8} row>
      <Button>
        <InfoIcon style={{ color: colors.main }} />
        <Div w={4} />
        <Typography style={{ color: colors.main }}>
          About the Creator
        </Typography>
      </Button>
    </Div>
  )
}

export default React.memo(Footer)
