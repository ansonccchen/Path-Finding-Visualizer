import React, { useState } from "react"
import { Typography, Button, MenuItem, Select } from "@material-ui/core"
import { FormControl, InputLabel, Slider } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { withStyles } from "@material-ui/core/styles"
import { Div } from "../../components"
import { colors } from "../../theme"
import { dijkstra } from "../../algorithms"
import { Node } from "../../types/node"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const algorithms = [
  "Dijkstra",
  // "Depth-first Search",
  // "Breath-first Search",
  // 'A*',
] as const
type Algorithms = typeof algorithms[number] | ""

const algoSpeeds = { slow: 16, normal: 8, fast: 2 }
const algoSpeedsArray = ["slow", "normal", "fast"] as const
type AlgoSpeed = typeof algoSpeedsArray[number]

interface Props {
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
    let startNode: Node | null = board?.[DEFAULT_START_ROW]?.[DEFAULT_START_COL]
    let endNode: Node | null = board?.[DEFAULT_END_ROW]?.[DEFAULT_END_COL]
    for (const row of board) {
      for (const node of row) {
        if (node.isStart) startNode = node
        else if (node.isEnd) endNode = node
      }
    }

    for (const row of board) {
      for (const node of row) {
        node.prevNode = null
        node.isVisited = false
        node.distance = Infinity
        if (!node.isWall) {
          nodeRefs.current[`${node.row}-${node.col}`].style.background =
            colors.lightShade
        }
      }
    }
    const { visitedNodesInOrder, shortestPath } = dijkstra({
      startNode,
      endNode,
      board,
    })
    setIsVisualizing(true)
    await new Promise((resolve) => setTimeout(resolve, 200))
    animateAlgorithm({ visitedNodesInOrder, shortestPath }).finally(() => {
      setIsVisualizing(false)
      !hasVisualized && setHasVisualized(true)
    })
  }

  const resetBoard = () => {
    const nodes = []
    for (let row = 0; row < 10; row++) {
      const _row = []
      for (let col = 0; col < 10; col++) {
        const node: Node = {
          col,
          distance: Infinity,
          isEnd: row === DEFAULT_END_ROW && col === DEFAULT_END_COL,
          isStart: row === DEFAULT_START_ROW && col === DEFAULT_START_COL,
          isVisited: false,
          isWall: false,
          prevNode: null,
          row,
        }
        nodeRefs.current[`${row}-${col}`].style.background = colors.lightShade
        _row.push(node)
      }
      nodes.push(_row)
    }
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

  const animateShortestPath = ({
    shortestPath,
    shortestPathDelay,
  }: {
    shortestPath: Node[]
    shortestPathDelay: number
  }) => {
    if (!shortestPath[shortestPath.length - 1].isEnd) {
      toast.error("No such path found :(")
      return
    }
    for (let j = 1; j < shortestPath.length; j++) {
      setTimeout(() => {
        nodeRefs.current[
          `${shortestPath[j].row}-${shortestPath[j].col}`
        ].style.backgroundColor = colors.lightAccent
      }, shortestPathDelay * j)
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
    const shortestPathDelay = 25
    for (let i = 1; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          animateShortestPath({ shortestPath, shortestPathDelay })
        }, delay * i)
      } else {
        setTimeout(() => {
          nodeRefs.current[
            `${visitedNodesInOrder[i].row}-${visitedNodesInOrder[i].col}`
          ].style.backgroundColor = colors.darkAccent
        }, delay * i)
      }
    }
    return new Promise((resolve) => {
      setTimeout(
        resolve,
        delay * visitedNodesInOrder.length +
          shortestPath.length * shortestPathDelay
      )
    })
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
      <ToastContainer autoClose={10000} closeButton position="bottom-right" />
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
