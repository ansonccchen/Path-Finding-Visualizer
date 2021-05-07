import { Node } from "../types/node"
import { getUnvisitedNeighbours } from "./dijkstra"

interface Props {
  board: Node[][]
  endNode: Node
  startNode: Node
}
const dfs = ({ board, endNode, startNode }: Props) => {
  const stack: Node[] = []
  startNode.distance = 0
  stack.push(startNode)

  const visitedNodesInOrder: Node[] = []
  const shortestPath: Node[] = []

  while (stack.length > 0) {
    const currNode: Node = stack.pop() as Node

    if (currNode.isWall || currNode.isVisited) continue
    if (currNode.distance === Infinity) break

    currNode.isVisited = true
    visitedNodesInOrder.push(currNode)

    if (currNode === endNode) break

    const unvisitedNeighbours = getUnvisitedNeighbours({
      node: currNode,
      board,
    })
    for (const neighbour of unvisitedNeighbours) {
      neighbour.distance = currNode.distance + 1
      neighbour.prevNode = currNode
      stack.push(neighbour)
    }
  }

  let currentNode: Node | null =
    visitedNodesInOrder[visitedNodesInOrder.length - 1]
  while (currentNode) {
    shortestPath.unshift(currentNode)
    currentNode = currentNode.prevNode
  }

  return { visitedNodesInOrder, shortestPath }
}

export default dfs
