import { colors } from "../../theme"
import { Node } from "../../types/node"

interface Props {
  nodeRefs: any
  shortestPath: Node[]
  visitedNodesInOrder: Node[]
}

export const animateInstantAlgorithm = async ({
  nodeRefs,
  shortestPath,
  visitedNodesInOrder,
}: Props) => {
  for (let i = 1; i < visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length - 1) {
      animateShortestPath({ shortestPath, nodeRefs })
    } else {
      nodeRefs.current[
        `${visitedNodesInOrder[i].row}-${visitedNodesInOrder[i].col}`
      ].style.backgroundColor = colors.darkAccent
    }
  }
}

interface Params {
  nodeRefs: any
  shortestPath: Node[]
}

const animateShortestPath = ({ nodeRefs, shortestPath }: Params) => {
  if (!shortestPath[shortestPath.length - 1].isEnd) return

  for (let j = 1; j < shortestPath.length; j++) {
    nodeRefs.current[
      `${shortestPath[j].row}-${shortestPath[j].col}`
    ].style.backgroundColor = colors.lightAccent
  }
}