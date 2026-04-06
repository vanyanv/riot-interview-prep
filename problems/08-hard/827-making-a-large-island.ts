/**
 * 827. Making A Large Island
 * Difficulty: Hard
 *
 * You are given an n x n binary matrix grid. You are allowed to change at most
 * one 0 to be 1.
 *
 * Return the size of the largest island in grid after applying this operation.
 *
 * An island is a 4-directionally connected group of 1s.
 *
 * Example 1:
 *   Input: grid = [[1,0],[0,1]]
 *   Output: 3
 *   Explanation: Change one 0 to 1 and connect two 1s, then we get an island
 *     with area = 3.
 *
 * Example 2:
 *   Input: grid = [[1,1],[1,0]]
 *   Output: 4
 *   Explanation: Change the 0 to 1 and make the island bigger, only one island
 *     with area = 4.
 *
 * Example 3:
 *   Input: grid = [[1,1],[1,1]]
 *   Output: 4
 *   Explanation: Can't change any 0 to 1, only one island with area = 4.
 *
 * Constraints:
 *   - n == grid.length
 *   - n == grid[i].length
 *   - 1 <= n <= 500
 *   - grid[i][j] is either 0 or 1
 *
 * Approach: Union-Find or DFS with Island Labeling
 *   1. First pass: Label each island with a unique ID and record its size.
 *      - Use DFS/BFS to find connected components.
 *      - Store island sizes in a map: islandId -> size.
 *   2. Second pass: For each 0 cell, check its 4 neighbors.
 *      - Sum up sizes of distinct neighboring islands + 1 (for flipping this cell).
 *      - Track the maximum.
 *   3. Handle edge case where the entire grid is 1s.
 */

function largestIsland(grid: number[][]): number {
  // TODO: implement using island labeling + neighbor check
  return 0;
}

export { largestIsland };
