import React, { useState, useRef } from "react"
import { Div } from "../components"
import { TopBar } from "./TopBar"
import { InfoBar } from "./InfoBar"
import { Board } from "./Board"
// import { Footer } from "./Footer"

const DEFAULT_START_ROW = 4
const DEFAULT_START_COL = 3
const DEFAULT_END_ROW = 4
const DEFAULT_END_COL = 7

const PathFinderVisualizer: React.FC = () => {
  const [board, setBoard] = useState<any[any]>([[]])
  const nodeRefs = useRef({})
  const [isVisualizing, setIsVisualizing] = useState<boolean>(false)
  const [hasVisualized, setHasVisualized] = useState<boolean>(false)

  return (
    <Div fill minHeight="100vh" minWidth={1304} overflowX="auto">
      <TopBar
        board={board}
        DEFAULT_END_COL={DEFAULT_END_COL}
        DEFAULT_END_ROW={DEFAULT_END_ROW}
        DEFAULT_START_COL={DEFAULT_START_COL}
        DEFAULT_START_ROW={DEFAULT_START_ROW}
        hasVisualized={hasVisualized}
        isVisualizing={isVisualizing}
        nodeRefs={nodeRefs}
        setBoard={setBoard}
        setHasVisualized={setHasVisualized}
        setIsVisualizing={setIsVisualizing}
      />
      <InfoBar />
      <Board
        board={board}
        DEFAULT_END_COL={DEFAULT_END_COL}
        DEFAULT_END_ROW={DEFAULT_END_ROW}
        DEFAULT_START_COL={DEFAULT_START_COL}
        DEFAULT_START_ROW={DEFAULT_START_ROW}
        hasVisualized={hasVisualized}
        isVisualizing={isVisualizing}
        nodeRefs={nodeRefs}
        setBoard={setBoard}
      />
      {/* <Footer /> */}
    </Div>
  )
}

export default PathFinderVisualizer
