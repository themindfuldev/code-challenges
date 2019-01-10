/*
You want to be able to access the largest element in a stack. ↴

You've already implemented this Stack class:

  class Stack(object):

    def __init__(self):
        """Initialize an empty stack"""
        self.items = []

    def push(self, item):
        """Push a new item onto the stack"""
        self.items.append(item)

    def pop(self):
        """Remove and return the last item"""
        # If the stack is empty, return None
        # (it would also be reasonable to throw an exception)
        if not self.items:
            return None

        return self.items.pop()

    def peek(self):
        """Return the last item without removing it"""
        if not self.items:
            return None
        return self.items[-1]
Python
Use your Stack class to implement a new class MaxStack with a method get_max() that returns the largest element in the stack. get_max() should not remove the item.

Your stacks will contain only integers.
*/

// Implement the push, pop, and getMax methods

class MaxStack {
    constructor() {
      this.stack = new Stack();
      this.orderedStack = new Stack();
    }
    
    useAux(item, callback) {
      const aux = new Stack();
      while (this.orderedStack.peek() > item) {
        aux.push(this.orderedStack.pop());
      }
      callback();
      while (aux.peek() !== null) {
        this.orderedStack.push(aux.pop());
      }
    }
  
    push(item) {
      this.useAux(item, () => this.orderedStack.push(item));
  
      this.stack.push(item);
    }
  
    pop() {
      const item = this.stack.pop();
      
      this.useAux(item, () => this.orderedStack.pop());
      
      return item;
    }
  
    getMax() {
      return this.orderedStack.peek();
    }
  }
  
  class Stack {
    constructor() {
  
      // Initialize an empty stack
      this.items = [];
    }
  
    // Push a new item onto the stack
    push(item) {
      this.items.push(item);
    }
  
    // Remove and return the last item
    pop() {
  
      // If the stack is empty, return null
      // (It would also be reasonable to throw an exception)
      if (!this.items.length) {
        return null;
      }
      return this.items.pop();
    }
  
    // Return the last item without removing it
    peek() {
      if (!this.items.length) {
        return null;
      }
      return this.items[this.items.length - 1];
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // Tests
  
  const s = new MaxStack();
  s.push(5);
  
  assertEquals(5, s.getMax(), 'check max after 1st push');
  
  s.push(4);
  s.push(7);
  s.push(7);
  s.push(8);
  
  assertEquals(8, s.getMax(), 'check before 1st pop');
  assertEquals(8, s.pop(), 'check pop #1');
  assertEquals(7, s.getMax(), 'check max after 1st pop');
  assertEquals(7, s.pop(), 'check pop #2');
  assertEquals(7, s.getMax(), 'check max after 2nd pop');
  assertEquals(7, s.pop(), 'check pop #3');
  assertEquals(5, s.getMax(), 'check max after 3rd pop');
  assertEquals(4, s.pop(), 'check pop #4');
  assertEquals(5, s.getMax(), 'check max after 4th pop');
  
  function assertEquals(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
  }