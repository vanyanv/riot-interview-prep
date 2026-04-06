/**
 * 20. Valid Parentheses
 * Difficulty: Easy
 *
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid.
 *
 * An input string is valid if:
 *   1. Open brackets must be closed by the same type of brackets.
 *   2. Open brackets must be closed in the correct order.
 *   3. Every close bracket has a corresponding open bracket of the same type.
 *
 * Example 1:
 *   Input: s = "()"
 *   Output: true
 *
 * Example 2:
 *   Input: s = "()[]{}"
 *   Output: true
 *
 * Example 3:
 *   Input: s = "(]"
 *   Output: false
 *
 * Example 4:
 *   Input: s = "([])"
 *   Output: true
 *
 * Constraints:
 *   - 1 <= s.length <= 10^4
 *   - s consists of parentheses only '()[]{}'
 *
 * Approach: Stack
 *   - Use a stack to track opening brackets.
 *   - For each character:
 *     - If it's an opening bracket, push it onto the stack.
 *     - If it's a closing bracket, check if the stack is non-empty and the top
 *       matches the corresponding opening bracket. If so, pop; otherwise return false.
 *   - At the end, return true if the stack is empty.
 */

function isValid(s: string): boolean {
  // TODO: implement using a stack
  return false;
}

export { isValid };
