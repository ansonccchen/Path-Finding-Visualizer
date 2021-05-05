import { Algorithms } from "../../types/algorithms"
import { Node } from "../../types/node"
import { dijkstra, dfs, bfs } from "../../algorithms"

interface Props {
  selectedAlgorithm: Algorithms
  board: Node[][]
  endNode: Node
  startNode: Node
}

export const selectAlgorithm = ({
  selectedAlgorithm,
  board,
  endNode,
  startNode,
}: Props) => {
  const visitedNodesInOrder: Node[] = []
  const shortestPath: Node[] = []

  switch (selectedAlgorithm) {
    case "Dijkstra":
      return dijkstra({ board, endNode, startNode })
    case "Depth-first Search":
      return dfs({ board, endNode, startNode })
    case "Breadth-first Search":
      return bfs({ board, endNode, startNode })
    // case "A*":
    //   return AStar({ board, endNode, startNode })
    default:
      return { visitedNodesInOrder, shortestPath }
  }
}
