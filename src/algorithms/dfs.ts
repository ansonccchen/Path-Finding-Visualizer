import { Node } from "../types/node"

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

const getUnvisitedNeighbours = ({
  board,
  node,
}: {
  board: Node[][]
  node: Node
}) => {
  const neighbours: Node[] = []
  const { row, col } = node
  if (row > 0) neighbours.push(board[row - 1][col])
  if (row < board.length - 1) neighbours.push(board[row + 1][col])
  if (col > 0) neighbours.push(board[row][col - 1])
  if (col < board[0].length - 1) neighbours.push(board[row][col + 1])
  return neighbours.filter((neighbour) => !neighbour.isVisited)
}

export default dfs
