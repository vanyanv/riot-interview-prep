/**
 * 767. Reorganize String
 * Difficulty: Medium
 *
 * Given a string s, rearrange the characters of s so that any two adjacent
 * characters are not the same.
 *
 * Return any possible rearrangement of s or return "" if not possible.
 *
 * Example 1:
 *   Input: s = "aab"
 *   Output: "aba"
 *
 * Example 2:
 *   Input: s = "aaab"
 *   Output: ""
 *   Explanation: It is not possible to rearrange "aaab" such that no two
 *     adjacent characters are the same.
 *
 * Example 3:
 *   Input: s = "vvvlo"
 *   Output: "vlvov"
 *
 * Constraints:
 *   - 1 <= s.length <= 500
 *   - s consists of lowercase English letters
 *
 * Approach: Greedy with Max Heap (Priority Queue)
 *   - Count character frequencies.
 *   - If any character appears more than (n + 1) / 2 times, return "".
 *   - Use a max heap to always pick the most frequent character.
 *   - Alternate by picking top two characters from the heap each iteration.
 *   - Alternatively, place the most frequent characters at even indices first,
 *     then fill odd indices.
 */

function reorganizeString(s: string): string {
  // TODO: implement
  return "";
}

export { reorganizeString };
