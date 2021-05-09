import React from "react"
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core"
import { Typography } from "@material-ui/core"
import { Div } from "../../components"

interface Props {
  isInfoDialogOpen: boolean
  setIsInfoDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const InfoDialog: React.FC<Props> = ({
  isInfoDialogOpen,
  setIsInfoDialogOpen,
}) => {
  return (
    <Dialog
      fullWidth
      open={isInfoDialogOpen}
      onClose={() => setIsInfoDialogOpen(false)}
    >
      <DialogTitle>
        <Typography variant="h4">Learn the Algorithms</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Div mb={16}>
          <Typography variant="h6" style={{ fontWeight: 550 }}>
            Dijkstra's Algorithm
          </Typography>
          <Typography>
            Dijkstra's Algorithm is known as the father of all path finding
            algorithms. It is a greedy algorithm that gurantees the shortest
            path by always traversing to the unvisited neighbouring nodes that
            have the shortest distance from the starting node first.
            Furthermore, this algorithm often utilizes a heap/priority queue to
            achieve this goal.
          </Typography>
          {/* <Typography>Runtime: </Typography> */}
        </Div>
        <Div mb={16}>
          <Typography variant="h6" style={{ fontWeight: 550 }}>
            Depth-first Search (DFS)
          </Typography>
          <Typography>
            DFS is a very common algorithm used in many graph and tree problems.
            This algorithm follows a LIFO (last-in-first-out) approach using a
            stack to explore unvisited neighbouring nodes in a going "deep"
            fashion. It explores a branch as far as possible before backtracking
            to a node and repeating this process on a different branch. Although
            DFS will find a path, it does not gurantee the shortest one.
          </Typography>
          {/* <Typography>Runtime:</Typography> */}
        </Div>
        <Div mb={16}>
          <Typography variant="h6" style={{ fontWeight: 550 }}>
            Breadth-first Search (BFS)
          </Typography>
          <Typography>
            BFS is another very widely used algorithm found in graph and tree
            problems and is a bit like the opposite of Depth-first Search. This
            algorithm follows a FIFO (first-in-first-out) approach using a queue
            to explore unvisited neighbouring nodes in a level order to find the
            shortest path. For example, it would explore all nodes on level 1
            before it moves on to level 2 nodes.
          </Typography>
          {/* <Typography>
            Runtime: O(E+V) where E is number of edges and V is vertices
          </Typography> */}
        </Div>
        <Div>
          <Typography variant="h6" style={{ fontWeight: 550 }}>
            A* (A Star)
          </Typography>
          <Typography>
            A* is known as one of the best and most popular algorithms for path
            finding. It is nearly identical to Dijkstra's, but has one slight
            difference, it uses a heuristic. There are three approximation
            heuristics that A* can use; those being Manhattan, Euclidean, and
            Diagonal distance. This application uses the Manhattan distance. By
            using a heuristic, at every step, it knows how far away each
            neighbouring node is from the end node, therefore it will lead to a
            more optimal decision on which node to explore next.
          </Typography>
          {/* <Typography>Runtime:</Typography> */}
        </Div>
      </DialogContent>
    </Dialog>
  )
}

export default React.memo(InfoDialog)
