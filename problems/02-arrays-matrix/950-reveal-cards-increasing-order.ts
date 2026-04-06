/**
 * 950. Reveal Cards In Increasing Order (Medium)
 * Tags: Array, Queue, Sorting, Simulation
 *
 * You are given an integer array deck. There is a deck of cards where every card
 * has a unique integer. The integer on the ith card is deck[i].
 *
 * You can order the deck in any order you want. Initially, all the cards start
 * face down (unrevealed) in one deck.
 *
 * You will do the following steps repeatedly until all cards are revealed:
 *   1. Take the top card of the deck, reveal it, and take it out of the deck.
 *   2. If there are still cards in the deck, put the next top card of the deck
 *      at the bottom of the deck.
 *   3. If there are still unrevealed cards, go back to step 1. Otherwise, stop.
 *
 * Return an ordering of the deck that would reveal the cards in increasing order.
 *
 * Example 1:
 *   Input: deck = [17,13,11,2,3,5,7]
 *   Output: [2,13,3,11,5,17,7]
 *   Explanation: We get the deck in the order [2,13,3,11,5,17,7] and reveal:
 *   reveal 2, move 13 to bottom -> [3,11,5,17,7,13]
 *   reveal 3, move 11 to bottom -> [5,17,7,13,11]
 *   reveal 5, move 17 to bottom -> [7,13,11,17]
 *   reveal 7, move 13 to bottom -> [11,17,13]
 *   reveal 11, move 17 to bottom -> [13,17]
 *   reveal 13, move 17 to bottom -> [17]
 *   reveal 17
 *
 * Example 2:
 *   Input: deck = [1,1000]
 *   Output: [1,1000]
 *
 * Constraints:
 *   - 1 <= deck.length <= 1000
 *   - 1 <= deck[i] <= 10^6
 *   - All the values of deck are unique.
 */

function deckRevealedIncreasing(deck: number[]): number[] {
  return [];
}
