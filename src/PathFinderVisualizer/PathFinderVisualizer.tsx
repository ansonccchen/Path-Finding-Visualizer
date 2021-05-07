import React, { useState, useRef } from "react"
import { Div } from "../components"
import { TopBar } from "./TopBar"
import { InfoBar } from "./InfoBar"
import { Board } from "./Board"
import { Algorithms, MazeAlgorithms } from "../types/algorithms"

const DEFAULT_START_ROW = 11
const DEFAULT_START_COL = 14
const DEFAULT_END_ROW = 11
const DEFAULT_END_COL = 34
const BOARD_ROWS = 25
const BOARD_COLS = 50

/* board for testing */
// const DEFAULT_START_ROW = 3
// const DEFAULT_START_COL = 2
// const DEFAULT_END_ROW = 3
// const DEFAULT_END_COL = 6
// const BOARD_ROWS = 10
// const BOARD_COLS = 10

const PathFinderVisualizer: React.FC = () => {
  const [board, setBoard] = useState<any[any]>([[]])
  const nodeRefs = useRef({})
  const wallCountRef = useRef({})

  const [isVisualizing, setIsVisualizing] = useState<boolean>(false)
  const [hasVisualized, setHasVisualized] = useState<boolean>(false)

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithms>(
    "Dijkstra"
  )
  const [
    selectedMazeAlgorithm,
    setSelectedMazeAlgorithm,
  ] = useState<MazeAlgorithms>("")

  const [startPosition, setStartPosition] = useState<number[]>([
    DEFAULT_START_ROW,
    DEFAULT_START_COL,
  ])
  const [endPosition, setEndPosition] = useState<number[]>([
    DEFAULT_END_ROW,
    DEFAULT_END_COL,
  ])
  const [unvisitedCount, setUnvisitedCount] = useState<number>(
    BOARD_ROWS * BOARD_COLS
  )
  const [visitedDistance, setVisitedDistance] = useState<number | "" | "N/A">(
    ""
  )
  const [pathDistance, setPathDistance] = useState<number | "" | "N/A">("")

  return (
    <Div fill minHeight="100vh" minWidth={1352} overflowX="auto">
      <TopBar
        BOARD_COLS={BOARD_COLS}
        BOARD_ROWS={BOARD_ROWS}
        board={board}
        DEFAULT_END_COL={DEFAULT_END_COL}
        DEFAULT_END_ROW={DEFAULT_END_ROW}
        DEFAULT_START_COL={DEFAULT_START_COL}
        DEFAULT_START_ROW={DEFAULT_START_ROW}
        hasVisualized={hasVisualized}
        isVisualizing={isVisualizing}
        nodeRefs={nodeRefs}
        selectedAlgorithm={selectedAlgorithm}
        setBoard={setBoard}
        setEndPosition={setEndPosition}
        setHasVisualized={setHasVisualized}
        setIsVisualizing={setIsVisualizing}
        setPathDistance={setPathDistance}
        setSelectedAlgorithm={setSelectedAlgorithm}
        setStartPosition={setStartPosition}
        setUnvisitedCount={setUnvisitedCount}
        setVisitedDistance={setVisitedDistance}
        wallCountRef={wallCountRef}
      />
      <InfoBar
        endPosition={endPosition}
        pathDistance={pathDistance}
        startPosition={startPosition}
        unvisitedCount={unvisitedCount}
        visitedDistance={visitedDistance}
        wallCountRef={wallCountRef}
      />
      <Board
        BOARD_COLS={BOARD_COLS}
        BOARD_ROWS={BOARD_ROWS}
        board={board}
        DEFAULT_END_COL={DEFAULT_END_COL}
        DEFAULT_END_ROW={DEFAULT_END_ROW}
        DEFAULT_START_COL={DEFAULT_START_COL}
        DEFAULT_START_ROW={DEFAULT_START_ROW}
        endPosition={endPosition}
        hasVisualized={hasVisualized}
        isVisualizing={isVisualizing}
        nodeRefs={nodeRefs}
        selectedAlgorithm={selectedAlgorithm}
        setBoard={setBoard}
        setEndPosition={setEndPosition}
        setPathDistance={setPathDistance}
        setStartPosition={setStartPosition}
        setUnvisitedCount={setUnvisitedCount}
        setVisitedDistance={setVisitedDistance}
        startPosition={startPosition}
        wallCountRef={wallCountRef}
      />
    </Div>
  )
}

export default PathFinderVisualizer
