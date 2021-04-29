import React, { useState } from "react"
import { Div } from "../components"
import TopBar from "./TopBar"
import Board from "./Board"

const PathFinderVisualizer: React.FC = () => {
  const [board, setBoard] = useState<any[any]>([[]])

  return (
    <Div fill minHeight="100vh">
      <TopBar board={board} />
      <Board board={board} setBoard={setBoard} />
    </Div>
  )
}

export default PathFinderVisualizer
