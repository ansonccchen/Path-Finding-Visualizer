import React, { useState } from "react"
import { Typography, Button } from "@material-ui/core"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Div } from "../../components"
import { colors } from "../../theme"
import { animateAlgorithm } from "../../helpers/animations/animateAlgorithm"
import { Node } from "../../types/node"
import { AlgoSpeed, AlgoSpeeds, Algorithms } from "../../types/algorithms"
import { preSetupAlgorithm } from "../../helpers/algorithms/preSetupAlgorithm"
import { selectAlgorithm } from "../../helpers/algorithms/selectAlgorithm"
import LogoView from "./LogoView"
import ClearButtons from "./ClearButtons"
import VisualizationOptions from "./VisualizationOptions"

const algoSpeeds: AlgoSpeeds = {
  slow: 24,
  normal: 10,
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

  return (
    <Div
      backgroundColor={colors.lightShade}
      row
      pv={8}
      ph={24}
      justifyContentCenter
    >
      <Div maxWidth={1704} row alignItemsCenter fill>
        <LogoView />
        <Div w={32} />
        <VisualizationOptions
          isVisualizing={isVisualizing}
          selectedAlgorithm={selectedAlgorithm}
          setSelectedAlgorithm={setSelectedAlgorithm}
          setSelectedAlgoSpeed={setSelectedAlgoSpeed}
        />
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
        <ClearButtons
          BOARD_COLS={BOARD_COLS}
          BOARD_ROWS={BOARD_ROWS}
          board={board}
          DEFAULT_END_COL={DEFAULT_END_COL}
          DEFAULT_END_ROW={DEFAULT_END_ROW}
          DEFAULT_START_COL={DEFAULT_START_COL}
          DEFAULT_START_ROW={DEFAULT_START_ROW}
          isVisualizing={isVisualizing}
          nodeRefs={nodeRefs}
          setBoard={setBoard}
          setEndPosition={setEndPosition}
          setHasVisualized={setHasVisualized}
          setPathDistance={setPathDistance}
          setStartPosition={setStartPosition}
          setUnvisitedCount={setUnvisitedCount}
          setVisitedDistance={setVisitedDistance}
          wallCountRef={wallCountRef}
        />
      </Div>
      <ToastContainer autoClose={8000} closeButton position="bottom-right" />
    </Div>
  )
}

const styles = {
  buttonText: { fontWeight: 500, color: colors.lightShade },
}

export default React.memo(TopBar)
