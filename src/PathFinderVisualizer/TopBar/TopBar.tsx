import React, { useState } from "react"
import { Typography, Button, MenuItem, Select } from "@material-ui/core"
import { FormControl, InputLabel, Slider } from "@material-ui/core"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { withStyles } from "@material-ui/core/styles"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Div } from "../../components"
import { colors } from "../../theme"
import { animateAlgorithm } from "../../helpers/animations/animateAlgorithm"
import { Node } from "../../types/node"
import { AlgoSpeed, AlgoSpeeds, algoSpeedsArray } from "../../types/algorithms"
import { algorithms, Algorithms } from "../../types/algorithms"
import { preSetupAlgorithm } from "../../helpers/algorithms/preSetupAlgorithm"
import { createBoard } from "../../helpers/board/createBoard"
import { selectAlgorithm } from "../../helpers/algorithms/selectAlgorithm"
import { iconPath } from "../../images"

const algoSpeeds: AlgoSpeeds = {
  slow: 24,
  normal: 12,
  fast: 2,
}

const marks: { value: number; label: AlgoSpeed }[] = []
for (let i = 0; i < algoSpeedsArray.length; i++) {
  marks.push({ value: i, label: algoSpeedsArray[i] })
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
  nodeRefs: React.MutableRefObject<{ [name: string]: any }>
  selectedAlgorithm: Algorithms
  setBoard: React.Dispatch<any>
  setEndPosition: React.Dispatch<React.SetStateAction<number[]>>
  setHasVisualized: React.Dispatch<React.SetStateAction<boolean>>
  setIsVisualizing: React.Dispatch<React.SetStateAction<boolean>>
  setPathDistance: React.Dispatch<React.SetStateAction<number | "" | "N/A">>
  setSelectedAlgorithm: React.Dispatch<React.SetStateAction<Algorithms>>
  setStartPosition: React.Dispatch<React.SetStateAction<number[]>>
  setUnvisitedCount: React.Dispatch<React.SetStateAction<number>>
  setVisitedDistance: React.Dispatch<React.SetStateAction<number | "" | "N/A">>
  wallCountRef: React.MutableRefObject<{ [name: string]: any } | null>
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
  selectedAlgorithm,
  setBoard,
  setEndPosition,
  setHasVisualized,
  setIsVisualizing,
  setPathDistance,
  setSelectedAlgorithm,
  setStartPosition,
  setUnvisitedCount,
  setVisitedDistance,
  wallCountRef,
}) => {
  const classes = useStyles()
  const [selectedAlgoSpeed, setSelectedAlgoSpeed] = useState<AlgoSpeed>(
    "normal"
  )

  const startVisualizer = async () => {
    const { startNode, endNode } = preSetupAlgorithm({
      board,
      DEFAULT_END_COL,
      DEFAULT_END_ROW,
      DEFAULT_START_COL,
      DEFAULT_START_ROW,
      nodeRefs,
    })
    const { visitedNodesInOrder, shortestPath } = selectAlgorithm({
      selectedAlgorithm,
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

      setUnvisitedCount(
        BOARD_COLS * BOARD_ROWS - visitedNodesInOrder.length + 1
      )
      setVisitedDistance(visitedNodesInOrder.length - 1)
      if (shortestPath[shortestPath.length - 1].isEnd)
        setPathDistance(shortestPath.length - 1)
      else setPathDistance("N/A")

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
    setStartPosition([DEFAULT_START_ROW, DEFAULT_START_COL])
    setEndPosition([DEFAULT_END_ROW, DEFAULT_END_COL])
    if (wallCountRef.current) {
      wallCountRef.current.count = 0
      wallCountRef.current.innerHTML = "Count: 0"
    }
    setUnvisitedCount(BOARD_COLS * BOARD_ROWS)
    setVisitedDistance("")
    setPathDistance("")
    setHasVisualized(false)
    setBoard(nodes)
  }
  const clearWalls = () => {
    for (const row of board) {
      for (const node of row) {
        if (node.isWall) {
          node.isWall = false
          nodeRefs.current[`${node.row}-${node.col}`].style.background =
            colors.lightShade
        }
      }
    }
    if (wallCountRef.current) {
      wallCountRef.current.count = 0
      wallCountRef.current.innerHTML = "Count: 0"
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
          <img
            src={iconPath}
            alt="path"
            style={{ objectFit: "contain", width: 56, height: 56 }}
          />
          <Div w={16} />
          <Typography variant="h5" style={styles.title}>
            Path Visualizer
          </Typography>
          <Div w={32} />
          <Div w={200}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>Select Algorithm</InputLabel>
              <Select
                disabled={isVisualizing}
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
              disabled={isVisualizing}
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
              backgroundColor={
                isVisualizing ? colors.disabled : colors.darkAccent
              }
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
            <Typography
              variant="h6"
              style={{
                color: isVisualizing ? colors.disabled : colors.main,
                fontWeight: 500,
              }}
            >
              Reset Board
            </Typography>
          </Button>
          <Div w={32} />
          <Button onClick={clearWalls} disabled={isVisualizing}>
            <Typography
              variant="h6"
              style={{
                color: isVisualizing ? colors.disabled : colors.main,
                fontWeight: 500,
              }}
            >
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

export default React.memo(TopBar)
