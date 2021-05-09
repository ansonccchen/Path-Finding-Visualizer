import { Node } from "../types/node"
import { getUnvisitedNeighbours } from "./dijkstra"

interface Params {
  board: Node[][]
  endNode: Node
  startNode: Node
}

const bfs = ({ board, endNode, startNode }: Params) => {
  const queue: Node[] = []
  startNode.distance = 0
  queue.push(startNode)

  const visitedNodesInOrder: Node[] = []
  const shortestPath: Node[] = []

  while (queue.length > 0) {
    const currNode: Node = queue.shift() as Node

    if (currNode.isWall) continue

    currNode.isVisited = true
    visitedNodesInOrder.push(currNode)

    if (currNode === endNode) break

    const unvisitedNeighbours = getUnvisitedNeighbours({
      node: currNode,
      board,
    })
    for (const neighbour of unvisitedNeighbours) {
      neighbour.isVisited = true
      neighbour.prevNode = currNode
      queue.push(neighbour)
    }
  }

  let currentNode: Node | null =
    visitedNodesInOrder[visitedNodesInOrder.length - 1]
  if (currentNode.isEnd) {
    while (currentNode) {
      shortestPath.unshift(currentNode)
      currentNode = currentNode.prevNode
    }
  }

  return { visitedNodesInOrder, shortestPath }
}

export default bfs
