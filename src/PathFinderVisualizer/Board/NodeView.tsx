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
  nodeRefs: any
  redoAlgorithm: () => void
  setEndPosition: React.Dispatch<React.SetStateAction<number[]>>
  setIsMovingEndNode: React.Dispatch<React.SetStateAction<boolean>>
  setIsMovingStartNode: React.Dispatch<React.SetStateAction<boolean>>
  setStartPosition: React.Dispatch<React.SetStateAction<number[]>>
  setWallCount: React.Dispatch<React.SetStateAction<number>>
  startPosition?: number[]
}

let prevStartNodeRef: Node | null = null
let prevEndNodeRef: Node | null = null
let initalNodeWallState: boolean = false
// let previousNodeWallState: boolean = false

let wallCount = 0

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
  setWallCount,
  startPosition,
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
        wallCount -= 1
        setWallCount(wallCount)
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
    setWallCount,
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
      nodeRefs.current[
        `${node.row}-${node.col}`
      ].style.backgroundColor = node.isWall
        ? colors.darkShade
        : colors.lightShade

      if (node.isWall) {
        wallCount += 1
        setWallCount(wallCount)
      } else {
        wallCount -= 1
        setWallCount(wallCount)
      }
    }
  }, [
    isMovingEndNode,
    isMovingStartNode,
    isVisualizing,
    node,
    nodeRefs,
    setWallCount,
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
        wallCount += 1
        setWallCount(wallCount)
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
  }, [isMovingEndNode, isMovingStartNode, node, nodeRefs, setWallCount])

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
