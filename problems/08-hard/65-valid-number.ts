/**
 * 65. Valid Number
 * Difficulty: Hard
 *
 * Given a string s, return whether s is a valid number.
 *
 * For example, all the following are valid numbers:
 *   "2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7",
 *   "+6e-1", "53.5e93", "-123.456e789"
 *
 * While the following are not valid numbers:
 *   "abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"
 *
 * Formally, a valid number is defined using one of the following definitions:
 *   1. An integer number followed optionally by an exponent.
 *   2. A decimal number followed optionally by an exponent.
 *
 * An integer number is defined with an optional sign '-' or '+' followed by digits.
 *
 * A decimal number is defined with an optional sign '-' or '+' followed by one
 * of the following definitions:
 *   1. Digits followed by a dot '.'.
 *   2. Digits followed by a dot '.' followed by digits.
 *   3. A dot '.' followed by digits.
 *
 * An exponent is defined with an exponent notation 'e' or 'E' followed by an
 * integer number.
 *
 * The digits are defined as one or more digits.
 *
 * Example 1:
 *   Input: s = "0"
 *   Output: true
 *
 * Example 2:
 *   Input: s = "e"
 *   Output: false
 *
 * Example 3:
 *   Input: s = "."
 *   Output: false
 *
 * Constraints:
 *   - 1 <= s.length <= 20
 *   - s consists of only English letters (both uppercase and lowercase),
 *     digits (0-9), plus '+', minus '-', or dot '.'
 *
 * Approach: DFA (Deterministic Finite Automaton) or Flag-based parsing
 *   - Track state flags: seenDigit, seenDot, seenExponent.
 *   - Iterate through each character and validate transitions:
 *     - Digits: always valid, set seenDigit = true.
 *     - '.': invalid if already seen dot or exponent.
 *     - 'e'/'E': invalid if already seen exponent or no digit before it.
 *     - '+'/'-': valid only at start or right after 'e'/'E'.
 *     - Any other character: invalid.
 *   - At the end, seenDigit must be true.
 */

function isNumber(s: string): boolean {
  // TODO: implement
  return false;
}

export { isNumber };
