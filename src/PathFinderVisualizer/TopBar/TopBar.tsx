import React, { useState } from "react"
import { Typography, Button, MenuItem, Select } from "@material-ui/core"
import { FormControl, InputLabel, Slider } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { withStyles } from "@material-ui/core/styles"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Div } from "../../components"
import { colors } from "../../theme"
import { dijkstra } from "../../algorithms"
import { animateAlgorithm } from "../../helpers/animations/animateAlgorithm"
import { Node } from "../../types/node"
import { algoSpeedsArray, AlgoSpeed, AlgoSpeeds } from "../../types/algorithms"
import { preSetupAlgorithm } from "../../helpers/algorithms/preSetupAlgorithm"
import { createBoard } from "../../helpers/board/createBoard"

const algorithms = [
  "Dijkstra",
  // "Depth-first Search",
  // "Breath-first Search",
  // 'A*',
] as const
type Algorithms = typeof algorithms[number] | ""

const algoSpeeds: AlgoSpeeds = {
  slow: 16,
  normal: 8,
  fast: 2,
}

interface Props {
  BOARD_COLS: number
  BOARD_ROWS: number
  board: Node[][]
  DEFAULT_END_COL: number
  DEFAULT_END_ROW: number
  DEFAULT_START_COL: number
  DEFAULT_START_ROW: number
  hasVisualized: boolean
  isVisualizing: boolean
  nodeRefs: any
  setBoard: React.Dispatch<any>
  setHasVisualized: React.Dispatch<React.SetStateAction<boolean>>
  setIsVisualizing: React.Dispatch<React.SetStateAction<boolean>>
}

const TopBar: React.FC<Props> = ({
  BOARD_COLS,
  BOARD_ROWS,
  board,
  DEFAULT_END_COL,
  DEFAULT_END_ROW,
  DEFAULT_START_COL,
  DEFAULT_START_ROW,
  hasVisualized,
  isVisualizing,
  nodeRefs,
  setBoard,
  setHasVisualized,
  setIsVisualizing,
}) => {
  const classes = useStyles()
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithms>(
    "Dijkstra"
  )
  const [selectedAlgoSpeed, setSelectedAlgoSpeed] = useState<AlgoSpeed>(
    "normal"
  )

  const marks: { value: number; label: AlgoSpeed }[] = []
  for (let i = 0; i < algoSpeedsArray.length; i++) {
    marks.push({ value: i, label: algoSpeedsArray[i] })
  }

  const startVisualizer = async () => {
    const { startNode, endNode } = preSetupAlgorithm({
      board,
      DEFAULT_END_COL,
      DEFAULT_END_ROW,
      DEFAULT_START_COL,
      DEFAULT_START_ROW,
      nodeRefs,
    })
    const { visitedNodesInOrder, shortestPath } = dijkstra({
      board,
      endNode,
      startNode,
    })

    setIsVisualizing(true)
    await new Promise((resolve) => setTimeout(resolve, 200))
    animateAlgorithm({
      visitedNodesInOrder,
      shortestPath,
      algoSpeeds,
      selectedAlgoSpeed,
      nodeRefs,
    }).finally(() => {
      setIsVisualizing(false)
      if (!hasVisualized) setHasVisualized(true)
    })
  }

  const resetBoard = () => {
    const nodes = createBoard({
      BOARD_COLS,
      BOARD_ROWS,
      DEFAULT_END_COL,
      DEFAULT_END_ROW,
      DEFAULT_START_COL,
      DEFAULT_START_ROW,
      nodeRefs,
    })
    setBoard(nodes)
  }
  const clearWalls = () => {
    for (const row of board) {
      for (const node of row) {
        node.isWall = false
        nodeRefs.current[`${node.row}-${node.col}`].style.background =
          colors.lightShade
      }
    }
  }

  return (
    <>
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
                  setSelectedAlgorithm(
                    (e.target.value as unknown) as Algorithms
                  )
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
              backgroundColor={isVisualizing ? "#9e9e9e" : colors.darkAccent}
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
          <Button onClick={resetBoard} disabled={isVisualizing}>
            <Typography variant="h6" style={styles.text}>
              Reset Board
            </Typography>
          </Button>
          <Div w={32} />
          <Button onClick={clearWalls} disabled={isVisualizing}>
            <Typography variant="h6" style={styles.text}>
              Clear Walls
            </Typography>
          </Button>
        </Div>
      </Div>
      <ToastContainer autoClose={8000} closeButton position="bottom-right" />
    </>
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
  thumb: {
    backgroundColor: colors.main,
  },
  mark: {
    backgroundColor: colors.lightAccent,
    height: 8,
    marginTop: -3,
  },
  markActive: {
    backgroundColor: colors.main,
    height: 8,
    marginTop: -3,
  },
})(Slider)

export default TopBar
