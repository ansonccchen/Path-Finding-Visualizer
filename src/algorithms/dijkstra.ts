import Heap from "heap-js"
import { Node } from "../types/node"

interface Props {
  startNode: Node
  endNode: Node
  board: Node[][]
}

const dijkstra = ({ startNode, endNode, board }: Props) => {
  const unvisitedNodesMinHeap = new Heap(
    (a: Node, b: Node) => a.distance - b.distance
  )
  startNode.distance = 0
  for (const row of board) {
    for (const node of row) {
      unvisitedNodesMinHeap.push(node)
    }
  }

  const visitedNodesInOrder: Node[] = []
  const shortestPath: Node[] = []

  while (unvisitedNodesMinHeap.length > 0) {
    // @ts-ignore
    const currNode: Node = unvisitedNodesMinHeap.pop()
    if (currNode.isWall) continue
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
      unvisitedNodesMinHeap.remove(neighbour)
      unvisitedNodesMinHeap.push(neighbour)
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

const getUnvisitedNeighbours = ({
  node,
  board,
}: {
  node: Node
  board: Node[][]
}) => {
  const neighbours: Node[] = []
  const { row, col } = node
  if (row > 0) neighbours.push(board[row - 1][col])
  if (row < board.length - 1) neighbours.push(board[row + 1][col])
  if (col > 0) neighbours.push(board[row][col - 1])
  if (col < board[0].length - 1) neighbours.push(board[row][col + 1])
  return neighbours.filter((neighbour) => !neighbour.isVisited)
}

export default dijkstra
