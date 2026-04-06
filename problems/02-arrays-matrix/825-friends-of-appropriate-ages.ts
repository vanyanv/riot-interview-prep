/**
 * 825. Friends Of Appropriate Ages (Medium)
 * Tags: Array, Two Pointers, Binary Search, Sorting
 *
 * There are n persons on a social media website. You are given an integer array
 * ages where ages[i] is the age of the ith person.
 *
 * Person x will NOT send a friend request to person y (x != y) if any of the
 * following conditions is true:
 *   - age[y] <= 0.5 * age[x] + 7
 *   - age[y] > age[x]
 *   - age[y] > 100 && age[x] < 100
 *
 * Otherwise, x will send a friend request to y.
 *
 * Note that if x requests y, y does not necessarily request x. Also, a person
 * will not send a friend request to themselves.
 *
 * Return the total number of friend requests made.
 *
 * Example 1:
 *   Input: ages = [16,16]
 *   Output: 2
 *
 * Example 2:
 *   Input: ages = [16,17,18]
 *   Output: 2
 *
 * Example 3:
 *   Input: ages = [20,30,100,110,120]
 *   Output: 3
 *
 * Constraints:
 *   - n == ages.length
 *   - 1 <= n <= 2 * 10^4
 *   - 1 <= ages[i] <= 120
 */

function numFriendRequests(ages: number[]): number {
  return 0;
}
