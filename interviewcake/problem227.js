
/*
Write a function to see if a binary tree ↴ is "superbalanced" (a new tree property we just made up).

A tree is "superbalanced" if the difference between the depths of any two leaf nodes ↴ is no greater than one.

Here's a sample binary tree node class:

  class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insertLeft(value) {
    this.left = new BinaryTreeNode(value);
    return this.left;
  }

  insertRight(value) {
    this.right = new BinaryTreeNode(value);
    return this.right;
  }
}
*/
class BinaryTreeNode {
    constructor(value) {
      this.value = value;
      this.left  = null;
      this.right = null;
    }
  
    insertLeft(value) {
      this.left = new BinaryTreeNode(value);
      return this.left;
    }
  
    insertRight(value) {
      this.right = new BinaryTreeNode(value);
      return this.right;
    }
  }
  
  function verifyLeavesLevels(leavesLevels, level) {
    for (let leavesLevel of leavesLevels) {
      if (Math.abs(level-leavesLevel) > 1) {
        return false;
      }
    }
    return true;
  }
  
  function isBalanced(treeRoot) {
    const queue = [{ node: treeRoot, level: 0 }];
    const leavesLevels = new Set();
    while (queue.length > 0) {
      const { node, level } = queue.pop();
      if (!node.left && !node.right) { //its a leaf!
        const isSuperBalanced = verifyLeavesLevels(leavesLevels, level);
        if (isSuperBalanced) {
          leavesLevels.add(level);
        }
        else {
          return false;
        }
      }
      else {
        if (node.left) {
          queue.push({ node: node.left, level: level + 1});
        }
        if (node.right) {
          queue.push({ node: node.right, level: level + 1});
        }
      }
    }
  
    return true;
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // Tests
  
  let desc = 'full tree';
  let treeRoot = new BinaryTreeNode(5);
  let leftNode = treeRoot.insertLeft(8);
  leftNode.insertLeft(1);
  leftNode.insertRight(2);
  let rightNode = treeRoot.insertRight(6);
  rightNode.insertLeft(3);
  rightNode.insertRight(4);
  assertEquals(isBalanced(treeRoot), true, desc);
  
  desc = 'both leaves at the same depth';
  treeRoot = new BinaryTreeNode(3);
  leftNode = treeRoot.insertLeft(4);
  leftNode.insertLeft(1);
  rightNode = treeRoot.insertRight(6);
  rightNode.insertRight(9);
  assertEquals(isBalanced(treeRoot), true, desc);
  
  desc = 'leaf heights differ by one';
  treeRoot = new BinaryTreeNode(6);
  leftNode = treeRoot.insertLeft(1);
  rightNode = treeRoot.insertRight(0);
  rightNode.insertRight(7);
  assertEquals(isBalanced(treeRoot), true, desc);
  
  desc = 'leaf heights differ by two';
  treeRoot = new BinaryTreeNode(6);
  leftNode = treeRoot.insertLeft(1);
  rightNode = treeRoot.insertRight(0);
  rightNode.insertRight(7).insertRight(8);
  assertEquals(isBalanced(treeRoot), false, desc);
  
  desc = 'three leaves total';
  treeRoot = new BinaryTreeNode(1);
  leftNode = treeRoot.insertLeft(5);
  rightNode = treeRoot.insertRight(9);
  rightNode.insertLeft(8);
  rightNode.insertRight(5);
  assertEquals(isBalanced(treeRoot), true, desc);
  
  desc = 'both subtrees superbalanced';
  treeRoot = new BinaryTreeNode(1);
  leftNode = treeRoot.insertLeft(5);
  rightNode = treeRoot.insertRight(9);
  rightNode.insertLeft(8).insertLeft(7);
  rightNode.insertRight(5);
  assertEquals(isBalanced(treeRoot), false, desc);
  
  desc = 'only one node';
  treeRoot = new BinaryTreeNode(1);
  assertEquals(isBalanced(treeRoot), true, desc);
  
  desc = 'linked list tree';
  treeRoot = new BinaryTreeNode(1);
  treeRoot.insertRight(2).insertRight(3).insertRight(4);
  assertEquals(isBalanced(treeRoot), true, desc);
  
  function assertEquals(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`)
    }
  }