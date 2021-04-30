import React, { useState, useRef } from "react"
import { Div } from "../components"
import TopBar from "./TopBar"
import Board from "./Board"

const PathFinderVisualizer: React.FC = () => {
  const [board, setBoard] = useState<any[any]>([[]])

  const nodeRefs = useRef({})

  return (
    <Div fill minHeight="100vh" minWidth={1000} overflowX="auto">
      <TopBar board={board} nodeRefs={nodeRefs} />
      <Board board={board} setBoard={setBoard} nodeRefs={nodeRefs} />
    </Div>
  )
}

export default PathFinderVisualizer
