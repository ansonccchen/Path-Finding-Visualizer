import React from "react"
import { Typography, IconButton } from "@material-ui/core"
import LinkedInIcon from "@material-ui/icons/LinkedIn"
import GitHubIcon from "@material-ui/icons/GitHub"
import { Div } from "../../components"
import { colors } from "../../theme"
import { iconPath } from "../../images"

const LogoView: React.FC = () => {
  return (
    <>
      <img
        src={iconPath}
        alt="path"
        style={{ objectFit: "contain", width: 56, height: 56 }}
      />
      <Div w={16} />
      <Div>
        <Typography variant="h5" style={styles.title}>
          Path Visualizer
        </Typography>
        <Div alignItemsCenter row>
          <Typography variant="caption" style={{ color: colors.darkShade }}>
            Created by Anson Chen
          </Typography>
          <Div w={2} />
          <IconButton
            size="small"
            aria-label="github.com"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/anson-chen-8a01751ab/",
                "_blank"
              )
            }
          >
            <LinkedInIcon fontSize="small" style={styles.icon} />
          </IconButton>
          <IconButton
            size="small"
            aria-label="Linkedin.com"
            onClick={() =>
              window.open("https://github.com/ansonccchen", "_blank")
            }
          >
            <GitHubIcon fontSize="small" style={styles.icon} />
          </IconButton>
        </Div>
      </Div>
    </>
  )
}

const styles = {
  icon: { color: colors.lightAccent },
  title: { color: colors.main, fontWeight: 600 },
}

export default React.memo(LogoView)
