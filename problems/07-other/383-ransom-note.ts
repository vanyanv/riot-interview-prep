/**
 * 383. Ransom Note
 * Difficulty: Easy
 *
 * Given two strings ransomNote and magazine, return true if ransomNote can be
 * constructed by using the letters from magazine and false otherwise.
 *
 * Each letter in magazine can only be used once in ransomNote.
 *
 * Example 1:
 *   Input: ransomNote = "a", magazine = "b"
 *   Output: false
 *
 * Example 2:
 *   Input: ransomNote = "aa", magazine = "ab"
 *   Output: false
 *
 * Example 3:
 *   Input: ransomNote = "aa", magazine = "aab"
 *   Output: true
 *
 * Constraints:
 *   - 1 <= ransomNote.length, magazine.length <= 10^5
 *   - ransomNote and magazine consist of lowercase English letters
 *
 * Approach: Hash Map / Frequency Count
 *   - Count the frequency of each character in magazine.
 *   - Iterate through ransomNote, decrementing counts.
 *   - If any count goes below zero, return false.
 *   - Alternatively, use a fixed-size array of 26 for lowercase letters.
 */

function canConstruct(ransomNote: string, magazine: string): boolean {
  // TODO: implement
  return false;
}

export { canConstruct };
