import Heap from "heap-js"

interface Props {
  startNode: any
  endNode: any
  board: any
}

const dijkstra = ({ startNode, endNode, board }: Props) => {
  // 1. create heap and add all elements to heap
  const unvisitedNodesMinHeap = new Heap(
    (a: { [x: string]: any }, b: { [x: string]: any }) =>
      a.distance - b.distance
  )
  startNode.distance = 0
  for (const row of board) {
    for (const node of row) {
      unvisitedNodesMinHeap.push(node)
    }
  }

  const visitedNodesInOrder: {}[] = []
  const shortestPath: {}[] = []

  while (unvisitedNodesMinHeap.length > 0) {
    const currNode: any = unvisitedNodesMinHeap.pop()
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

  let currentNode = endNode
  while (currentNode !== null) {
    shortestPath.unshift(currentNode)
    currentNode = currentNode.prevNode
  }

  return { visitedNodesInOrder, shortestPath }
}

const getUnvisitedNeighbours = ({ node, board }: { node: any; board: any }) => {
  const neighbours: any[] = []
  const { row, col } = node

  if (row > 0) neighbours.push(board[row - 1][col])
  if (row < board.length - 1) neighbours.push(board[row + 1][col])
  if (col > 0) neighbours.push(board[row][col - 1])
  if (col < board[0].length - 1) neighbours.push(board[row][col + 1])

  return neighbours.filter((neighbour) => !neighbour.isVisited)
}

export default dijkstra
