import { colors } from "../../theme"
import { Node } from "../../types/node"

interface Params {
  nodeRefs: React.MutableRefObject<{ [name: string]: any }>
  shortestPath: Node[]
  visitedNodesInOrder: Node[]
}

export const animateInstantAlgorithm = ({
  nodeRefs,
  shortestPath,
  visitedNodesInOrder,
}: Params) => {
  if (!visitedNodesInOrder[visitedNodesInOrder.length - 1].isEnd) {
    for (let i = 1; i < visitedNodesInOrder.length; i++) {
      animateVisitedNodes({ nodeRefs, visitedNodesInOrder, i })
    }
  } else {
    for (let i = 1; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        animateShortestPath({ shortestPath, nodeRefs })
      } else {
        animateVisitedNodes({ nodeRefs, visitedNodesInOrder, i })
      }
    }
  }
}

const animateVisitedNodes = ({
  nodeRefs,
  visitedNodesInOrder,
  i,
}: {
  nodeRefs: React.MutableRefObject<{ [name: string]: any }>
  visitedNodesInOrder: Node[]
  i: number
}) => {
  nodeRefs.current[
    `${visitedNodesInOrder[i].row}-${visitedNodesInOrder[i].col}`
  ].style.backgroundColor = colors.darkAccent
}

const animateShortestPath = ({
  nodeRefs,
  shortestPath,
}: {
  nodeRefs: React.MutableRefObject<{ [name: string]: any }>
  shortestPath: Node[]
}) => {
  for (let j = 1; j < shortestPath.length; j++) {
    nodeRefs.current[
      `${shortestPath[j].row}-${shortestPath[j].col}`
    ].style.backgroundColor = colors.lightAccent
  }
}
