import { Node } from "../../types/node"
import { AlgoSpeed, AlgoSpeeds } from "../../types/algorithms"
import "./animations.css"

interface Params {
  algoSpeeds: AlgoSpeeds
  nodeRefs: React.MutableRefObject<{ [name: string]: any }>
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
}: Params) => {
  const delay = algoSpeeds[selectedAlgoSpeed]
  const shortestPathDelay = 24

  if (!visitedNodesInOrder[visitedNodesInOrder.length - 1].isEnd) {
    for (let i = 1; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        animateVisitedNodes({ nodeRefs, visitedNodesInOrder, i })
      }, delay * i)
    }
  } else {
    for (let i = 1; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length - 1) {
        setTimeout(() => {
          animateShortestPath({ shortestPath, shortestPathDelay, nodeRefs })
        }, delay * i)
      } else {
        setTimeout(() => {
          animateVisitedNodes({ nodeRefs, visitedNodesInOrder, i })
        }, delay * i)
      }
    }
  }

  return new Promise((resolve) => {
    setTimeout(
      resolve,
      delay * visitedNodesInOrder.length +
        shortestPath.length * shortestPathDelay +
        1500
    )
  })
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
  ].classList.add("node-visited")
}

const animateShortestPath = ({
  shortestPath,
  shortestPathDelay,
  nodeRefs,
}: {
  shortestPath: Node[]
  shortestPathDelay: number
  nodeRefs: React.MutableRefObject<{ [name: string]: any }>
}) => {
  for (let j = 1; j < shortestPath.length; j++) {
    setTimeout(() => {
      nodeRefs.current[
        `${shortestPath[j].row}-${shortestPath[j].col}`
      ].classList.add("node-shortest-path")
    }, shortestPathDelay * j)
  }
}
