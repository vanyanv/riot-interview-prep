/**
 * 116. Populating Next Right Pointers in Each Node
 * https://leetcode.com/problems/populating-next-right-pointers-in-each-node/
 * Difficulty: Medium
 *
 * You are given a perfect binary tree where all leaves are on the same level,
 * and every parent has two children. The binary tree has the following definition:
 *
 *   struct Node {
 *     int val;
 *     Node *left;
 *     Node *right;
 *     Node *next;
 *   }
 *
 * Populate each next pointer to point to its next right node. If there is no
 * next right node, the next pointer should be set to NULL.
 *
 * Initially, all next pointers are set to NULL.
 *
 * Example 1:
 *   Input: root = [1,2,3,4,5,6,7]
 *   Output: [1,#,2,3,#,4,5,6,7,#]
 *   Explanation: The serialization uses '#' to denote null next pointers.
 *     Given the perfect binary tree:
 *           1
 *         /   \
 *        2     3
 *       / \   / \
 *      4   5 6   7
 *     After connecting:
 *        1 -> NULL
 *       / \
 *      2 -> 3 -> NULL
 *     / \ / \
 *    4->5->6->7 -> NULL
 *
 * Example 2:
 *   Input: root = []
 *   Output: []
 *
 * Constraints:
 *   - The number of nodes in the tree is in the range [0, 2^12 - 1].
 *   - -1000 <= Node.val <= 1000
 *
 * Follow-up:
 *   - You may only use constant extra space.
 *   - The recursive approach is fine. The implicit stack space used by
 *     recursion does not count as extra space.
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  next: TreeNode | null;
  constructor(
    val?: number,
    left?: TreeNode | null,
    right?: TreeNode | null,
    next?: TreeNode | null
  ) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.next = next === undefined ? null : next;
  }
}

function connect(root: TreeNode | null): TreeNode | null {
  // TODO: implement
  return null;
}

export { TreeNode, connect };
