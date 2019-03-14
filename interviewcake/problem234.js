/*
Find a duplicate, Space Edition™.

We have an array of integers, where:

The integers are in the range 1..n1..n
The array has a length of n+1n+1
It follows that our array has at least one integer which appears at least twice. But it may have several duplicates, and each duplicate may appear more than twice.

Write a function which finds an integer that appears more than once in our array. (If there are multiple duplicates, you only need to find one of them.)

We're going to run this function on our new, super-hip MacBook Pro With Retina Display™. Thing is, the damn thing came with the RAM soldered right to the motherboard, so we can't upgrade our RAM. So we need to optimize for space!
*/
// Find a number that appears more than once
function findRepeat(numbers) {
  const { length } = numbers;
  let start = 1;
  let end = length-1;
  
  while (end != start) {
    let leftCount = 0;
    let rightCount = 0;
    const mid = Math.trunc((start + end) / 2);
    
    for (let number of numbers) {
      if (number >= start && number <= end) {
        if (number <= mid) leftCount++;
        else rightCount++;
      }
    }
    
    if (leftCount < rightCount) start = mid+1;
    else end = mid; 
  }
  
  return start;
}

function findRepeat2(numbers) {
  // Appending 1st element to last to make it easier to work with the indices
  numbers.push(numbers[0]);
  
  const { length } = numbers;
  
  let i = 1;
  do {
    const val = numbers[i];
    if (val !== i) {
      const swap = numbers[val];
      if (swap === val) {
        return val;
      }
      numbers[val] = val;
      numbers[i] = swap;
    }
    else {
      i++;
    }
    
  } while (i < length);

  return -1;
}

function findRepeat3(numbers) {
    let numbersSeen = 0;
    for (let number of numbers) {
      if ((numbersSeen & (1 << number)) !== 0) {
        return number;
      }
      numbersSeen |= 1 << number;
    }
  
    // Whoops--no duplicate
    throw new Error('no duplicate!');
  }


// Tests

let desc = 'just the repeated number';
let actual = findRepeat([1, 1]);
let expected = 1;
assertEqual(actual, expected, desc);

desc = 'short array';
actual = findRepeat([1, 2, 3, 2]);
expected = 2;
assertEqual(actual, expected, desc);

desc = 'medium array';
actual = findRepeat([1, 2, 5, 5, 5, 5]);
expected = 5;
assertEqual(actual, expected, desc);

desc = 'long array';
actual = findRepeat([4, 1, 4, 8, 3, 2, 7, 6, 5]);
expected = 4;
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}