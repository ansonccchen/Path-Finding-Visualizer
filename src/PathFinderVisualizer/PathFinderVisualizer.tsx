import React, { useState, useRef } from "react"
import { Div } from "../components"
import { TopBar } from "./TopBar"
import { InfoBar } from "./InfoBar"
import { Board } from "./Board"
import { Algorithms } from "../types/algorithms"
// import { Footer } from "./Footer"

const DEFAULT_START_ROW = 4
const DEFAULT_START_COL = 3
const DEFAULT_END_ROW = 4
const DEFAULT_END_COL = 7
const BOARD_ROWS = 15
const BOARD_COLS = 15

const PathFinderVisualizer: React.FC = () => {
  const [board, setBoard] = useState<any[any]>([[]])
  const nodeRefs = useRef({})
  const [isVisualizing, setIsVisualizing] = useState<boolean>(false)
  const [hasVisualized, setHasVisualized] = useState<boolean>(false)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithms>(
    "Dijkstra"
  )

  const [startPosition, setStartPosition] = useState<number[]>([
    DEFAULT_START_ROW,
    DEFAULT_START_COL,
  ])
  const [endPosition, setEndPosition] = useState<number[]>([
    DEFAULT_END_ROW,
    DEFAULT_END_COL,
  ])
  const [wallCount, setWallCount] = useState<number>(0)
  const [unvisitedCount, setUnvisitedCount] = useState<number>(
    BOARD_ROWS * BOARD_COLS
  )
  const [visitedDistance, setVisitedDistance] = useState<number | "" | "N/A">(
    ""
  )
  const [pathDistance, setPathDistance] = useState<number | "" | "N/A">("")

  return (
    <Div fill minHeight="100vh" minWidth={1304} overflowX="auto">
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
        setHasVisualized={setHasVisualized}
        setIsVisualizing={setIsVisualizing}
        setPathDistance={setPathDistance}
        setSelectedAlgorithm={setSelectedAlgorithm}
        setUnvisitedCount={setUnvisitedCount}
        setVisitedDistance={setVisitedDistance}
      />
      <InfoBar
        endPosition={endPosition}
        pathDistance={pathDistance}
        startPosition={startPosition}
        unvisitedCount={unvisitedCount}
        visitedDistance={visitedDistance}
        wallCount={wallCount}
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
        setWallCount={setWallCount}
        startPosition={startPosition}
      />
      {/* <Footer /> */}
    </Div>
  )
}

export default PathFinderVisualizer
