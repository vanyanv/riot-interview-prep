/**
 * 25. Reverse Nodes in k-Group
 * Difficulty: Hard
 *
 * Given the head of a linked list, reverse the nodes of the list k at a time,
 * and return the modified list.
 *
 * k is a positive integer and is less than or equal to the length of the linked
 * list. If the number of nodes is not a multiple of k then left-out nodes, in
 * the end, should remain as it is.
 *
 * You may not alter the values in the list's nodes, only nodes themselves may
 * be changed.
 *
 * Example 1:
 *   Input: head = [1,2,3,4,5], k = 2
 *   Output: [2,1,4,3,5]
 *   Explanation:
 *     1->2->3->4->5  becomes  2->1->4->3->5
 *
 * Example 2:
 *   Input: head = [1,2,3,4,5], k = 3
 *   Output: [3,2,1,4,5]
 *   Explanation:
 *     1->2->3->4->5  becomes  3->2->1->4->5
 *
 * Example 3:
 *   Input: head = [1,2,3,4,5], k = 1
 *   Output: [1,2,3,4,5]
 *   Explanation: No reversal needed when k = 1.
 *
 * Constraints:
 *   - The number of nodes in the list is n
 *   - 1 <= k <= n <= 5000
 *   - 0 <= Node.val <= 1000
 *
 * Follow-up: Can you solve the problem in O(1) extra memory space?
 *
 * Approach:
 *   - Use a dummy node before the head.
 *   - Count k nodes ahead. If fewer than k remain, stop.
 *   - Reverse the k nodes in-place.
 *   - Connect the reversed group to the previous part and the next part.
 *   - Move the pointer forward and repeat.
 */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  // TODO: implement
  return null;
}

export { ListNode, reverseKGroup };
