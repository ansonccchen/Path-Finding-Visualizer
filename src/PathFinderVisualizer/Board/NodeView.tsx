import React, { useCallback } from "react"
import { colors } from "../../theme"
import { Node } from "../../types/node"
import GridNode from "./GridNode"

interface Props {
  endPosition?: number[]
  isMovingEndNode: boolean
  isMovingStartNode: boolean
  isVisualizing: boolean
  node: Node
  nodeRefs: React.MutableRefObject<{ [name: string]: any }>
  redoAlgorithm: () => void
  setEndPosition: React.Dispatch<React.SetStateAction<number[]>>
  setIsMovingEndNode: React.Dispatch<React.SetStateAction<boolean>>
  setIsMovingStartNode: React.Dispatch<React.SetStateAction<boolean>>
  setStartPosition: React.Dispatch<React.SetStateAction<number[]>>
  startPosition?: number[]
  wallCountRef: React.MutableRefObject<{ [name: string]: any } | null>
}

let prevStartNodeRef: Node | null = null
let prevEndNodeRef: Node | null = null
let initalNodeWallState: boolean = false
// let previousNodeWallState: boolean = false

const NodeView: React.FC<Props> = ({
  endPosition,
  isMovingEndNode,
  isMovingStartNode,
  isVisualizing,
  node,
  nodeRefs,
  redoAlgorithm,
  setEndPosition,
  setIsMovingEndNode,
  setIsMovingStartNode,
  setStartPosition,
  startPosition,
  wallCountRef,
}) => {
  const handleOnMouseDown = useCallback(() => {
    if (isVisualizing) return
    if (node.isStart) {
      setIsMovingStartNode(true)
    } else if (node.isEnd) {
      setIsMovingEndNode(true)
    }
  }, [
    isVisualizing,
    node.isEnd,
    node.isStart,
    setIsMovingEndNode,
    setIsMovingStartNode,
  ])

  const handleOnMouseUp = useCallback(() => {
    if (isVisualizing) return
    if (isMovingStartNode) {
      if (!node.isEnd) {
        node.isStart = true
      } else {
        if (prevStartNodeRef) {
          prevStartNodeRef.isStart = true
          prevStartNodeRef.isWall = false
          nodeRefs.current[
            `${prevStartNodeRef.row}-${prevStartNodeRef.col}`
          ].style.backgroundColor = colors.lightShade
        }
      }
      setIsMovingStartNode(false)
    } else if (isMovingEndNode) {
      if (!node.isStart) {
        node.isEnd = true
      } else {
        prevEndNodeRef && (prevEndNodeRef.isEnd = true)
      }
      setIsMovingEndNode(false)
    }
  }, [
    isMovingEndNode,
    isMovingStartNode,
    isVisualizing,
    node,
    nodeRefs,
    setIsMovingEndNode,
    setIsMovingStartNode,
  ])

  const handleOnMouseEnter = useCallback(() => {
    if (isVisualizing) return

    const wallCheck = () => {
      if (node.isWall) {
        initalNodeWallState = true
        node.isWall = false
        nodeRefs.current[`${node.row}-${node.col}`].style.backgroundColor =
          colors.lightShade
        if (wallCountRef.current) {
          wallCountRef.current.count -= 1
          wallCountRef.current.innerHTML =
            "Count: " + (wallCountRef.current.count ?? 0)
        }
      }
    }

    if (isMovingStartNode && !node.isEnd) {
      wallCheck()
      node.isStart = true
      setStartPosition([node.row, node.col])
      redoAlgorithm()
    } else if (isMovingEndNode && !node.isStart) {
      wallCheck()
      node.isEnd = true
      setEndPosition([node.row, node.col])
      redoAlgorithm()
    }
  }, [
    isMovingEndNode,
    isMovingStartNode,
    isVisualizing,
    node,
    nodeRefs,
    redoAlgorithm,
    setEndPosition,
    setStartPosition,
    wallCountRef,
  ])

  const handleOnClick = useCallback(() => {
    if (
      !isMovingEndNode &&
      !isMovingStartNode &&
      !isVisualizing &&
      !node.isEnd &&
      !node.isStart
    ) {
      node.isWall = !node.isWall
      nodeRefs.current[`${node.row}-${node.col}`].classList.remove(
        "node-shortest-path",
        "node-visited"
      )
      nodeRefs.current[
        `${node.row}-${node.col}`
      ].style.backgroundColor = node.isWall
        ? colors.darkShade
        : colors.lightShade

      if (wallCountRef.current) {
        if (node.isWall) wallCountRef.current.count += 1
        else wallCountRef.current.count -= 1

        wallCountRef.current.innerHTML =
          "Count: " + (wallCountRef.current.count ?? 0)
      }
    }
  }, [
    isMovingEndNode,
    isMovingStartNode,
    isVisualizing,
    node,
    nodeRefs,
    wallCountRef,
  ])

  const handleOnMouseOver = useCallback(() => {
    if (
      !isMovingEndNode &&
      !isMovingStartNode &&
      !isVisualizing &&
      !node.isEnd &&
      !node.isStart &&
      !node.isVisited
    ) {
      nodeRefs.current[`${node.row}-${node.col}`].style.backgroundColor =
        colors.darkShade
    }
  }, [
    isMovingEndNode,
    isMovingStartNode,
    isVisualizing,
    node.col,
    node.isEnd,
    node.isStart,
    node.isVisited,
    node.row,
    nodeRefs,
  ])

  const handleOnMouseLeave = useCallback(() => {
    const wallCheck = () => {
      if (initalNodeWallState) {
        initalNodeWallState = false
        node.isWall = true
        nodeRefs.current[`${node.row}-${node.col}`].style.backgroundColor =
          colors.darkShade
        if (wallCountRef.current) {
          wallCountRef.current.count += 1
          wallCountRef.current.innerHTML =
            "Count: " + (wallCountRef.current.count ?? 0)
        }
      }
    }
    if (isMovingStartNode) {
      wallCheck()
      node.isStart = false
      prevStartNodeRef = node
    } else if (isMovingEndNode) {
      wallCheck()
      node.isEnd = false
      prevEndNodeRef = node
    } else {
      if (!node.isStart && !node.isEnd && !node.isVisited) {
        if (!node.isWall) {
          nodeRefs.current[`${node.row}-${node.col}`].style.backgroundColor =
            colors.lightShade
        }
      }
    }
  }, [isMovingEndNode, isMovingStartNode, node, nodeRefs, wallCountRef])

  return (
    <GridNode
      col={node.col}
      isEnd={node.isEnd}
      isStart={node.isStart}
      isWall={node.isWall}
      nodeRefs={nodeRefs}
      onClick={handleOnClick}
      onMouseLeave={handleOnMouseLeave}
      onMouseOver={handleOnMouseOver}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      onMouseEnter={handleOnMouseEnter}
      row={node.row}
    />
  )
}

export default React.memo(NodeView)
