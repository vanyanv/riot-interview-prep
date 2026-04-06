/**
 * 37. Sudoku Solver
 * Difficulty: Hard
 *
 * Write a program to solve a Sudoku puzzle by filling the empty cells.
 *
 * A sudoku solution must satisfy all of the following rules:
 *   1. Each of the digits 1-9 must occur exactly once in each row.
 *   2. Each of the digits 1-9 must occur exactly once in each column.
 *   3. Each of the digits 1-9 must occur exactly once in each of the 9 3x3
 *      sub-boxes of the grid.
 *
 * The '.' character indicates empty cells.
 *
 * Example 1:
 *   Input: board =
 *     [["5","3",".",".","7",".",".",".","."],
 *      ["6",".",".","1","9","5",".",".","."],
 *      [".","9","8",".",".",".",".","6","."],
 *      ["8",".",".",".","6",".",".",".","3"],
 *      ["4",".",".","8",".","3",".",".","1"],
 *      ["7",".",".",".","2",".",".",".","6"],
 *      [".","6",".",".",".",".","2","8","."],
 *      [".",".",".","4","1","9",".",".","5"],
 *      [".",".",".",".","8",".",".","7","9"]]
 *   Output:
 *     [["5","3","4","6","7","8","9","1","2"],
 *      ["6","7","2","1","9","5","3","4","8"],
 *      ["1","9","8","3","4","2","5","6","7"],
 *      ["8","5","9","7","6","1","4","2","3"],
 *      ["4","2","6","8","5","3","7","9","1"],
 *      ["7","1","3","9","2","4","8","5","6"],
 *      ["9","6","1","5","3","7","2","8","4"],
 *      ["2","8","7","4","1","9","6","3","5"],
 *      ["3","4","5","2","8","6","1","7","9"]]
 *   Explanation: The input board is shown above and the only valid solution is shown.
 *
 * Constraints:
 *   - board.length == 9
 *   - board[i].length == 9
 *   - board[i][j] is a digit or '.'
 *   - It is guaranteed that the input board has only one solution
 *
 * Approach: Backtracking
 *   - Find the next empty cell.
 *   - Try placing digits '1' through '9'.
 *   - For each digit, check if it is valid in the current row, column, and 3x3 box.
 *   - If valid, place it and recurse. If recursion fails, backtrack.
 *   - Use sets or boolean arrays for O(1) validity checks.
 */

function solveSudoku(board: string[][]): void {
  // TODO: implement backtracking sudoku solver
  // Modifies board in-place
}

export { solveSudoku };
