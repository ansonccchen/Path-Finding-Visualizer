import { Algorithms } from "../../types/algorithms"
import { Node } from "../../types/node"
import { dijkstra, dfs, bfs, aStar } from "../../algorithms"

interface Params {
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
}: Params) => {
  const visitedNodesInOrder: Node[] = []
  const shortestPath: Node[] = []

  switch (selectedAlgorithm) {
    case "Dijkstra":
      return dijkstra({ board, endNode, startNode })
    case "Depth-first Search":
      return dfs({ board, endNode, startNode })
    case "Breadth-first Search":
      return bfs({ board, endNode, startNode })
    case "A*":
      return aStar({ board, endNode, startNode })
    default:
      return { visitedNodesInOrder, shortestPath }
  }
}
