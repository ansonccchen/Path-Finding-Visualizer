import { toast } from "react-toastify"
import { colors } from "../../theme"
import { Node } from "../../types/node"

import { AlgoSpeed, AlgoSpeeds } from "../../types/algorithms"

interface Props {
  algoSpeeds: AlgoSpeeds
  nodeRefs: any
  selectedAlgoSpeed: AlgoSpeed
  shortestPath: Node[]
  visitedNodesInOrder: Node[]
}

export const animateAlgorithm = async ({
  algoSpeeds,
  nodeRefs,
  selectedAlgoSpeed,
  shortestPath,
  visitedNodesInOrder,
}: Props) => {
  const delay = algoSpeeds[selectedAlgoSpeed]
  const shortestPathDelay = 25

  for (let i = 1; i < visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length - 1) {
      setTimeout(() => {
        animateShortestPath({ shortestPath, shortestPathDelay, nodeRefs })
      }, delay * i)
    } else {
      setTimeout(() => {
        nodeRefs.current[
          `${visitedNodesInOrder[i].row}-${visitedNodesInOrder[i].col}`
        ].style.backgroundColor = colors.darkAccent
      }, delay * i)
    }
  }

  return new Promise((resolve) => {
    setTimeout(
      resolve,
      delay * visitedNodesInOrder.length +
        shortestPath.length * shortestPathDelay
    )
  })
}

interface Params {
  shortestPath: Node[]
  shortestPathDelay: number
  nodeRefs: any
}

const animateShortestPath = ({
  shortestPath,
  shortestPathDelay,
  nodeRefs,
}: Params) => {
  if (!shortestPath[shortestPath.length - 1].isEnd) {
    const { row, col } = shortestPath[shortestPath.length - 1]
    nodeRefs.current[`${row}-${col}`].style.backgroundColor = colors.darkAccent
    toast.error("No such path found :(")
    return
  }
  for (let j = 1; j < shortestPath.length; j++) {
    setTimeout(() => {
      nodeRefs.current[
        `${shortestPath[j].row}-${shortestPath[j].col}`
      ].style.backgroundColor = colors.lightAccent
    }, shortestPathDelay * j)
  }
}
