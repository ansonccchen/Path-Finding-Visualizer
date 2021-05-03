import React, { useCallback } from "react"
import { colors } from "../../theme"
import { Node } from "../../types/node"

import GridNode from "./GridNode"

interface Props {
  node: Node
  isVisualizing: boolean
  nodeRefs: any
}

const NodeView: React.FC<Props> = ({ node, isVisualizing, nodeRefs }) => {
  const handleOnClick = useCallback(() => {
    if (!node.isStart && !node.isEnd && !isVisualizing) {
      node.isWall = !node.isWall
      nodeRefs.current[
        `${node.row}-${node.col}`
      ].style.backgroundColor = node.isWall
        ? colors.darkShade
        : colors.lightShade
    }
  }, [node, isVisualizing, nodeRefs])

  const handleOnMouseOver = useCallback(() => {
    if (!node.isStart && !node.isEnd && !node.isVisited) {
      nodeRefs.current[`${node.row}-${node.col}`].style.backgroundColor =
        colors.darkShade
    }
  }, [node.col, node.isEnd, node.isStart, node.isVisited, node.row, nodeRefs])

  const handleOnMouseLeave = useCallback(() => {
    if (!node.isStart && !node.isEnd && !node.isVisited) {
      if (!node.isWall) {
        nodeRefs.current[`${node.row}-${node.col}`].style.backgroundColor =
          colors.lightShade
      }
    }
  }, [
    node.col,
    node.isEnd,
    node.isStart,
    node.isVisited,
    node.isWall,
    node.row,
    nodeRefs,
  ])

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
      row={node.row}
    />
  )
}

export default React.memo(NodeView)
