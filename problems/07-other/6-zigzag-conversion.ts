/**
 * 6. Zigzag Conversion
 * Difficulty: Medium
 *
 * The string "PAYPALISHIRING" is written in a zigzag pattern on a given number
 * of rows like this:
 *
 *   P   A   H   N
 *   A P L S I I G
 *   Y   I   R
 *
 * And then read line by line: "PAHNAPLSIIGYIR"
 *
 * Write the code that will take a string and make this conversion given a number
 * of rows.
 *
 * Example 1:
 *   Input: s = "PAYPALISHIRING", numRows = 3
 *   Output: "PAHNAPLSIIGYIR"
 *   Explanation:
 *     P   A   H   N
 *     A P L S I I G
 *     Y   I   R
 *
 * Example 2:
 *   Input: s = "PAYPALISHIRING", numRows = 4
 *   Output: "PINALSIGYAHRPI"
 *   Explanation:
 *     P     I    N
 *     A   L S  I G
 *     Y A   H R
 *     P     I
 *
 * Example 3:
 *   Input: s = "A", numRows = 1
 *   Output: "A"
 *
 * Constraints:
 *   - 1 <= s.length <= 1000
 *   - s consists of English letters (lower-case and upper-case), ',' and '.'
 *   - 1 <= numRows <= 1000
 *
 * Approach:
 *   - Create an array of strings, one for each row.
 *   - Iterate through the string, moving down then up in a zigzag pattern.
 *   - Append each character to its corresponding row.
 *   - Concatenate all rows for the result.
 */

function convert(s: string, numRows: number): string {
  // TODO: implement zigzag conversion
  return "";
}

export { convert };
