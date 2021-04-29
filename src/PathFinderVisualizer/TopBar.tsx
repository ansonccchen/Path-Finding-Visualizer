import React, { useState } from "react"
import { Typography, Button, MenuItem, Select } from "@material-ui/core"
import { FormControl, InputLabel } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { Div } from "../components"
import { colors } from "../theme"
import { dijkstra } from "../algorithms"

const algorithms = [
  "",
  "Dijkstra",
  "Depth-first Search",
  "Breath-first Search",
] as const
type Algorithms = typeof algorithms[number]
interface Props {
  board: [any[]]
}

const STARTROW = 7
const STARTCOL = 20
const ENDROW = 7
const ENDCOL = 40

const TopBar: React.FC<Props> = ({ board }) => {
  const classes = useStyles()
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithms>("")
  const startVisualizer = () => {
    if (board) {
      // @ts-ignore
      const startNode = board?.[STARTROW]?.[STARTCOL]
      // @ts-ignore
      const endNode = board?.[ENDROW]?.[ENDCOL]
      const { visitedNodesInOrder, shortestPath } = dijkstra({
        startNode,
        endNode,
        board,
      })
      console.log(visitedNodesInOrder, shortestPath)
    }
  }

  return (
    <Div backgroundColor={colors.main} row alignItemsCenter pv={16} ph={24}>
      <Typography variant="h5" style={styles.title}>
        Path Visualizer
      </Typography>
      <Div w={200}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Select Algorithm</InputLabel>
          <Select
            value={selectedAlgorithm}
            onChange={(e) =>
              setSelectedAlgorithm((e.target.value as unknown) as Algorithms)
            }
            label="Select Algorithm"
          >
            {algorithms.map((algorithm, index) => {
              if (algorithm === "") return null
              return (
                <MenuItem key={index} value={algorithm}>
                  {algorithm}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Div>
      <Button onClick={startVisualizer}>
        <Typography style={styles.button} variant="h6">
          Visualize
        </Typography>
      </Button>
    </Div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
)

interface Styles {
  title: {}
  button: {}
}

const styles: Styles = {
  title: {
    fontWeight: 600,
  },
  button: {
    fontWeight: 600,
  },
}

export default TopBar
