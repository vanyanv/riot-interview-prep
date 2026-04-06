/**
 * 495. Teemo Attacking (Medium)
 * Tags: Array, Simulation
 *
 * Our hero Teemo has an enemy, Ashe. Teemo wants to poison Ashe.
 *
 * You are given the ascending attack time series of Teemo's attacks and the
 * poisoning time duration. Return the total time that Ashe is in poisoned condition.
 *
 * You may assume that Teemo attacks at the very beginning of specific time points.
 * His poisoning time is inclusive of the attack time.
 *
 * Example 1:
 * Input: timeSeries = [1,4], duration = 2
 * Output: 4
 * Explanation: At time 1, Teemo attacks and Ashe is poisoned for [1,2].
 * At time 4, Teemo attacks and Ashe is poisoned for [4,5]. Total = 4.
 *
 * Example 2:
 * Input: timeSeries = [1,2], duration = 2
 * Output: 3
 * Explanation: At time 1, Teemo attacks and Ashe is poisoned for [1,2].
 * At time 2, poison resets, Ashe is poisoned for [2,3]. Total = 3.
 *
 * Constraints:
 * - 1 <= timeSeries.length <= 10^4
 * - 0 <= timeSeries[i], duration <= 10^7
 * - timeSeries is sorted in non-decreasing order.
 */

function findPoisonedDuration(timeSeries: number[], duration: number): number {
  // TODO
  return 0;
}
