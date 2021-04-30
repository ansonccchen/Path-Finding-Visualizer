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

const algoSpeed = ["slow", "medium", "fast"] as const
type AlgoSpeed = typeof algoSpeed[number]

interface Props {
  board: [any[]]
  nodeRefs: any
}

const STARTROW = 10
const STARTCOL = 15
const ENDROW = 10
const ENDCOL = 35

const TopBar: React.FC<Props> = ({ board, nodeRefs }) => {
  const classes = useStyles()
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithms>("")
  const [selectedAlgoSpeed, setSelectedAlgoSpeed] = useState<AlgoSpeed>("slow")
  const startVisualizer = () => {
    // @ts-ignore
    const startNode = board?.[STARTROW]?.[STARTCOL]
    // @ts-ignore
    const endNode = board?.[ENDROW]?.[ENDCOL]
    const { visitedNodesInOrder, shortestPath } = dijkstra({
      startNode,
      endNode,
      board,
    })
    resetBoard()
    animateAlgorithm({ visitedNodesInOrder, shortestPath })
  }

  const resetBoard = () => {
    for (const key in nodeRefs.current) {
      if (key !== `${STARTROW}-${STARTCOL}` && key !== `${ENDROW}-${ENDCOL}`) {
        nodeRefs.current[key].style.background = colors.lightShade
      }
    }
  }

  const animateShortestPath = ({ shortestPath }: { shortestPath: any[] }) => {
    for (let j = 1; j < shortestPath.length - 1; j++) {
      setTimeout(() => {
        nodeRefs.current[
          `${shortestPath[j].row}-${shortestPath[j].col}`
        ].style.backgroundColor = "pink"
      }, 25 * j)
    }
  }

  const animateAlgorithm = ({
    visitedNodesInOrder,
    shortestPath,
  }: {
    visitedNodesInOrder: any[]
    shortestPath: any[]
  }) => {
    const delay = 10
    for (let i = 1; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          animateShortestPath({ shortestPath })
        }, delay * i)
      } else {
        setTimeout(() => {
          nodeRefs.current[
            `${visitedNodesInOrder[i].row}-${visitedNodesInOrder[i].col}`
          ].style.backgroundColor = "red"
        }, delay * i)
      }
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
