/**
 * 1802. Maximum Value at a Given Index in a Bounded Array
 * Difficulty: Medium
 *
 * You are given three positive integers: n, index, and maxSum.
 *
 * You want to construct an array nums (0-indexed) that satisfies the following
 * conditions:
 *   - nums.length == n
 *   - nums[i] is a positive integer where 0 <= i < n
 *   - abs(nums[i] - nums[i+1]) <= 1 where 0 <= i < n-1
 *   - The sum of all the elements of nums does not exceed maxSum
 *   - nums[index] is maximized
 *
 * Return nums[index] of the constructed array.
 *
 * Note that abs(x) equals x if x >= 0, and -x otherwise.
 *
 * Example 1:
 *   Input: n = 4, index = 2, maxSum = 6
 *   Output: 2
 *   Explanation: nums = [1, 1, 2, 1] is one array that satisfies all the
 *     conditions. There are no arrays that satisfy all the conditions and have
 *     nums[2] == 3, so 2 is the maximum nums[2].
 *
 * Example 2:
 *   Input: n = 6, index = 1, maxSum = 10
 *   Output: 3
 *
 * Constraints:
 *   - 1 <= n <= 10^9
 *   - 0 <= index < n
 *   - 1 <= maxSum <= 10^9
 *
 * Approach: Binary Search
 *   - Binary search on the answer (the value at nums[index]).
 *   - For a candidate value v, calculate the minimum possible sum of the array:
 *     - From index, values decrease by 1 going left and right (down to minimum 1).
 *     - Use arithmetic series formula to compute the sum on each side.
 *   - If the minimum sum <= maxSum, the candidate is feasible; try higher.
 *   - Otherwise, try lower.
 */

function maxValue(n: number, index: number, maxSum: number): number {
  // TODO: implement using binary search
  return 0;
}

export { maxValue };
