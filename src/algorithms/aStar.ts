import { Node } from "../types/node"
import Heap from "heap-js"
import { getUnvisitedNeighbours } from "./dijkstra"

interface Params {
  board: Node[][]
  endNode: Node
  startNode: Node
}

const aStar = ({ board, endNode, startNode }: Params) => {
  const unvisitedNodesMinHeap = new Heap(
    (a: Node, b: Node) => a.fDistance - b.fDistance
  )

  startNode.fDistance = 0
  startNode.gDistance = 0
  startNode.hDistance = 0

  for (const row of board) {
    for (const node of row) {
      unvisitedNodesMinHeap.push(node)
    }
  }

  const visitedNodesInOrder: Node[] = []
  const shortestPath: Node[] = []

  while (unvisitedNodesMinHeap.length > 0) {
    const currNode: Node = unvisitedNodesMinHeap.pop() as Node

    if (currNode.isWall) continue
    if (currNode.fDistance === Infinity) break

    currNode.isVisited = true
    visitedNodesInOrder.push(currNode)

    if (currNode === endNode) break

    const unvisitedNeighbours = getUnvisitedNeighbours({
      node: currNode,
      board,
    })
    for (const neighbour of unvisitedNeighbours) {
      neighbour.gDistance = currNode.gDistance + 1
      neighbour.hDistance = calculateManhattanDistance({
        currRow: neighbour.row,
        currCol: neighbour.col,
        endRow: endNode.row,
        endCol: endNode.col,
      })
      neighbour.fDistance = neighbour.hDistance + neighbour.gDistance
      neighbour.prevNode = currNode
      unvisitedNodesMinHeap.remove(neighbour)
      unvisitedNodesMinHeap.push(neighbour)
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

const calculateManhattanDistance = ({
  currRow,
  currCol,
  endRow,
  endCol,
}: {
  currRow: number
  currCol: number
  endRow: number
  endCol: number
}) => {
  return Math.abs(currRow - endRow) + Math.abs(currCol - endCol)
}

export default aStar
