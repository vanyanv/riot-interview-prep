/**
 * 986. Interval List Intersections (Medium)
 * Tags: Array, Two Pointers
 *
 * You are given two lists of closed intervals, firstList and secondList, where
 * firstList[i] = [starti, endi] and secondList[j] = [startj, endj]. Each list
 * of intervals is pairwise disjoint and in sorted order.
 *
 * Return the intersection of these two interval lists.
 *
 * A closed interval [a, b] (with a <= b) denotes the set of real numbers x
 * with a <= x <= b.
 *
 * The intersection of two closed intervals is a set of real numbers that is
 * either empty, or represented as a closed interval.
 *
 * Example 1:
 *   Input: firstList = [[0,2],[5,10],[13,23],[24,25]],
 *          secondList = [[1,5],[8,12],[15,24],[25,26]]
 *   Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
 *
 * Example 2:
 *   Input: firstList = [[1,3],[5,9]], secondList = []
 *   Output: []
 *
 * Constraints:
 *   - 0 <= firstList.length, secondList.length <= 1000
 *   - firstList.length + secondList.length >= 1
 *   - 0 <= starti < endi <= 10^9
 *   - 0 <= startj < endj <= 10^9
 *   - start_i < start_{i+1}
 *   - start_j < start_{j+1}
 */

function intervalIntersection(firstList: number[][], secondList: number[][]): number[][] {
  return [];
}
