/*
You have a singly-linked list ↴ and want to check if it contains a cycle.

A singly-linked list is built with nodes, where each node has:

node.next—the next node in the list.
node.value—the data held in the node. For example, if our linked list stores people in line at the movies, node.value might be the person's name.
For example:

  class LinkedListNode(object):

    def __init__(self, value):
        self.value = value
        self.next  = None

A cycle occurs when a node’s next points back to a previous node in the list. The linked list is no longer linear with a beginning and end—instead, it cycles through a loop of nodes.

Write a function contains_cycle() that takes the first node in a singly-linked list and returns a boolean indicating whether the list contains a cycle.
*/

class LinkedListNode {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  function containsCycle(firstNode) {
    // Check if the linked list contains a cycle
    let slow = firstNode;
    let fast = firstNode
    while (fast) {
      slow = slow.next;
      fast = fast.next;
      if (fast) {
        fast = fast.next;
      }
      else {
        return false;
      }
  
      if (slow === fast) {
        return true;
      }
      
    }
  
    return false;
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // Tests
  
  let desc = 'linked list with no cycle';
  let nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
  assertEquals(containsCycle(nodes[0]), false, desc);
  
  desc = 'cycle loops to beginning';
  nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
  nodes[3].next = nodes[0];
  assertEquals(containsCycle(nodes[0]), true, desc);
  
  desc = 'cycle loops to middle';
  nodes = valuesToLinkedListNodes([1, 2, 3, 4, 5]);
  nodes[4].next = nodes[2];
  assertEquals(containsCycle(nodes[0]), true, desc);
  
  desc = 'two node cycle at end';
  nodes = valuesToLinkedListNodes([1, 2, 3, 4, 5]);
  nodes[4].next = nodes[3];
  assertEquals(containsCycle(nodes[0]), true, desc);
  
  desc = 'empty list';
  assertEquals(containsCycle(null), false, desc);
  
  desc = 'one element linked list no cycle';
  let firstNode = new LinkedListNode(1);
  assertEquals(containsCycle(firstNode), false, desc);
  
  desc = 'one element linked list cycle';
  firstNode = new LinkedListNode(1);
  firstNode.next = firstNode;
  assertEquals(containsCycle(firstNode), true, desc);
  
  function valuesToLinkedListNodes(values) {
    const nodes = [];
    for (let i = 0; i < values.length; i++) {
      const node = new LinkedListNode(values[i]);
      if (i > 0) {
        nodes[i - 1].next = node;
      }
      nodes.push(node);
    }
    return nodes;
  }
  
  function assertEquals(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
  }