/**
 * 133. Clone Graph (Medium)
 * Tags: Hash Table, DFS, BFS, Graph
 *
 * Given a reference of a node in a connected undirected graph, return a deep copy
 * (clone) of the graph. Each node in the graph contains a value (int) and a list
 * (List[Node]) of its neighbors.
 *
 * class Node {
 *   val: number
 *   neighbors: Node[]
 * }
 *
 * Test case format: The graph is represented as an adjacency list.
 *
 * Example 1:
 * Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
 * Output: [[2,4],[1,3],[2,4],[1,3]]
 *
 * Constraints:
 * - The number of nodes in the graph is in the range [0, 100].
 * - 1 <= Node.val <= 100
 * - Node.val is unique for each node.
 * - There are no repeated edges and no self-loops in the graph.
 * - The Graph is connected and all nodes can be visited starting from the given node.
 */

class GraphNode {
  val: number;
  neighbors: GraphNode[];
  constructor(val?: number, neighbors?: GraphNode[]) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
  }
}

function cloneGraph(node: GraphNode | null): GraphNode | null {
  // TODO
  return null;
}
