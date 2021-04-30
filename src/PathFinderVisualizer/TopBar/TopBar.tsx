import React, { useState } from "react"
import { Typography, Button, MenuItem, Select } from "@material-ui/core"
import { FormControl, InputLabel, Slider } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { withStyles } from "@material-ui/core/styles"
import { Div } from "../../components"
import { colors } from "../../theme"
import { dijkstra } from "../../algorithms"
import { Node } from "../../types/node"

const algorithms = [
  "Dijkstra",
  // "Depth-first Search",
  // "Breath-first Search",
  // 'A*',
] as const
type Algorithms = typeof algorithms[number] | ""

const algoSpeeds = { slow: 15, normal: 7, fast: 2 }
const algoSpeedsArray = ["slow", "normal", "fast"] as const
type AlgoSpeed = typeof algoSpeedsArray[number]

interface Props {
  board: Node[][]
  nodeRefs: any
}

const DEFAULT_START_ROW = 12
const DEFAULT_START_COL = 15
const DEFAULT_END_ROW = 12
const DEFAULT_END_COL = 35

const TopBar: React.FC<Props> = ({ board, nodeRefs }) => {
  const classes = useStyles()
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithms>(
    "Dijkstra"
  )
  const [selectedAlgoSpeed, setSelectedAlgoSpeed] = useState<AlgoSpeed>(
    "normal"
  )
  const [isVisualizing, setIsVisualizing] = useState<boolean>(false)

  const marks: { value: number; label: AlgoSpeed }[] = []
  for (let i = 0; i < algoSpeedsArray.length; i++) {
    marks.push({ value: i, label: algoSpeedsArray[i] })
  }

  const startVisualizer = () => {
    const startNode: Node = board?.[DEFAULT_START_ROW]?.[DEFAULT_START_COL]
    const endNode: Node = board?.[DEFAULT_END_ROW]?.[DEFAULT_END_COL]
    const { visitedNodesInOrder, shortestPath } = dijkstra({
      startNode,
      endNode,
      board,
    })
    resetBoard()
    setIsVisualizing(true)
    animateAlgorithm({ visitedNodesInOrder, shortestPath }).finally(() =>
      setIsVisualizing(false)
    )
  }

  const resetBoard = () => {
    for (const key in nodeRefs.current) {
      nodeRefs.current[key].style.background = colors.lightShade
    }
  }
  const clearWalls = () => {}

  const animateShortestPath = ({ shortestPath }: { shortestPath: Node[] }) => {
    for (let j = 1; j < shortestPath.length; j++) {
      setTimeout(() => {
        nodeRefs.current[
          `${shortestPath[j].row}-${shortestPath[j].col}`
        ].style.backgroundColor = colors.lightAccent
      }, 25 * j)
    }
  }
  const animateAlgorithm = async ({
    visitedNodesInOrder,
    shortestPath,
  }: {
    visitedNodesInOrder: Node[]
    shortestPath: Node[]
  }) => {
    const delay = algoSpeeds[selectedAlgoSpeed]
    for (let i = 1; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          animateShortestPath({ shortestPath })
        }, delay * i)
      } else {
        setTimeout(() => {
          nodeRefs.current[
            `${visitedNodesInOrder[i].row}-${visitedNodesInOrder[i].col}`
          ].style.backgroundColor = colors.darkAccent
        }, delay * i)
      }
    }
  }

  return (
    <Div
      backgroundColor={colors.lightShade}
      row
      pv={8}
      ph={24}
      justifyContentCenter
    >
      <Div maxWidth={1704} row alignItemsCenter fill>
        <Typography variant="h5" style={styles.title}>
          Path Visualizer
        </Typography>
        <Div w={32} />
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
                return (
                  <MenuItem key={index} value={algorithm}>
                    {algorithm}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Div>
        <Div w={32} />
        <Div w={200}>
          <Typography style={{ color: colors.main }}>
            Algorithm Speed:
          </Typography>
          <SpeedSlider
            defaultValue={1}
            valueLabelFormat={(e, value) =>
              marks.findIndex((mark) => mark.value === value) + 1
            }
            step={null}
            marks={marks}
            onChange={(e, value) =>
              setSelectedAlgoSpeed(algoSpeedsArray[value as number])
            }
            max={2}
          />
        </Div>
        <Div w={32} />
        <Button onClick={startVisualizer} disabled={isVisualizing}>
          <Div
            backgroundColor={colors.darkAccent}
            pv={8}
            ph={16}
            borderRadius={4}
          >
            <Typography style={styles.buttonText} variant="h6">
              {isVisualizing ? "Visualizing..." : "Visualize"}
            </Typography>
          </Div>
        </Button>
        <Div w={32} />
        <Button onClick={resetBoard}>
          <Typography variant="h6" style={styles.text}>
            Reset Board
          </Typography>
        </Button>
        <Div w={32} />
        <Button onClick={clearWalls}>
          <Typography variant="h6" style={styles.text}>
            Clear Walls
          </Typography>
        </Button>
      </Div>
    </Div>
  )
}

const styles = {
  title: {
    color: colors.main,
    fontWeight: 600,
  },
  text: {
    fontWeight: 500,
    color: colors.main,
  },
  buttonText: { fontWeight: 500, color: colors.lightShade },
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      borderColor: "white",
    },
  })
)

const SpeedSlider = withStyles({
  markLabelActive: {
    color: colors.main,
  },
  rail: {
    color: colors.lightAccent,
  },
  track: {
    color: colors.darkAccent,
  },
})(Slider)

export default TopBar