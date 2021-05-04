import React, { useState, useRef } from "react"
import { Div } from "../components"
import { TopBar } from "./TopBar"
import { InfoBar } from "./InfoBar"
import { Board } from "./Board"
import { Footer } from "./Footer"

const PathFinderVisualizer: React.FC = () => {
  const [board, setBoard] = useState<any[any]>([[]])
  const nodeRefs = useRef({})
  const [isVisualizing, setIsVisualizing] = useState<boolean>(false)

  return (
    <Div fill minHeight="100vh" minWidth={1304} overflowX="auto">
      <TopBar
        board={board}
        isVisualizing={isVisualizing}
        nodeRefs={nodeRefs}
        setIsVisualizing={setIsVisualizing}
      />
      <InfoBar />
      <Board
        board={board}
        isVisualizing={isVisualizing}
        nodeRefs={nodeRefs}
        setBoard={setBoard}
      />
      {/* <Footer /> */}
    </Div>
  )
}

export default PathFinderVisualizer
