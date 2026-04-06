/**
 * 1353. Maximum Number of Events That Can Be Attended
 * Difficulty: Medium
 *
 * You are given an array of events where events[i] = [startDayi, endDayi].
 * Every event i starts at startDayi and ends at endDayi.
 *
 * You can attend an event i at any day d where startDayi <= d <= endDayi.
 * You can only attend one event at any time d.
 *
 * Return the maximum number of events you can attend.
 *
 * Example 1:
 *   Input: events = [[1,2],[2,3],[3,4]]
 *   Output: 3
 *   Explanation: You can attend all three events.
 *     Attend the first event on day 1.
 *     Attend the second event on day 2.
 *     Attend the third event on day 3.
 *
 * Example 2:
 *   Input: events = [[1,2],[2,3],[3,4],[1,2]]
 *   Output: 4
 *
 * Example 3:
 *   Input: events = [[1,4],[4,4],[2,2],[3,4],[1,1]]
 *   Output: 4
 *
 * Example 4:
 *   Input: events = [[1,100000]]
 *   Output: 1
 *
 * Constraints:
 *   - 1 <= events.length <= 10^5
 *   - events[i].length == 2
 *   - 1 <= startDayi <= endDayi <= 10^5
 *
 * Approach: Greedy with Min Heap
 *   - Sort events by start day.
 *   - Iterate through each day from earliest to latest.
 *   - Add all events starting on the current day to a min heap (keyed by end day).
 *   - Remove expired events (end day < current day) from the heap.
 *   - Attend the event with the earliest end day (pop from heap).
 *   - This greedy approach ensures we always attend the event closest to expiring.
 */

function maxEvents(events: number[][]): number {
  // TODO: implement greedy with min heap
  return 0;
}

export { maxEvents };
