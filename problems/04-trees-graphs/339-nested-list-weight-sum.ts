/**
 * 339. Nested List Weight Sum
 * https://leetcode.com/problems/nested-list-weight-sum/
 * Difficulty: Medium
 *
 * You are given a nested list of integers. Each element is either an integer
 * or a list whose elements may also be integers or other lists.
 *
 * The depth of an integer is the number of lists that it is inside of. For
 * example, the nested list [1,[2,2],[[3],2],1] has each integer's value set
 * to its depth.
 *
 * Return the sum of each integer in the list multiplied by its depth.
 *
 * Example 1:
 *   Input: nestedList = [[1,1],2,[1,1]]
 *   Output: 10
 *   Explanation: Four 1's at depth 2, one 2 at depth 1.
 *     4 * (1*2) + 1 * (2*1) = 8 + 2 = 10.
 *
 * Example 2:
 *   Input: nestedList = [1,[4,[6]]]
 *   Output: 27
 *   Explanation: One 1 at depth 1, one 4 at depth 2, one 6 at depth 3.
 *     1*1 + 4*2 + 6*3 = 1 + 8 + 18 = 27.
 *
 * Example 3:
 *   Input: nestedList = [0]
 *   Output: 0
 *
 * Constraints:
 *   - 1 <= nestedList.length <= 50
 *   - The values of the integers in the nested list are in the range [-100, 100].
 *   - The maximum depth of any integer is less than or equal to 50.
 */

/**
 * This is the interface that represents nested integers.
 * You should not implement it; it is provided for reference.
 */
interface NestedInteger {
  /** If this NestedInteger holds a single integer, return true, otherwise false. */
  isInteger(): boolean;
  /** If this NestedInteger holds a single integer, return that integer. Otherwise, return null. */
  getInteger(): number | null;
  /** Set this NestedInteger to hold a single integer. */
  setInteger(value: number): void;
  /** If this NestedInteger holds a nested list, append item to it. */
  add(elem: NestedInteger): void;
  /** If this NestedInteger holds a nested list, return that list. Otherwise, return an empty list. */
  getList(): NestedInteger[];
}

function depthSum(nestedList: NestedInteger[]): number {
  // TODO: implement
  return 0;
}

export { NestedInteger, depthSum };
