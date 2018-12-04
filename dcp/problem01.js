/*
Problem #1
This problem was recently asked by Google.

Given a list of numbers and a number k, return whether any two numbers from the list add up to k.

For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.

Bonus: Can you do this in one pass ?
*/

function doTwoNumbersSumUpToK(list, k) {
    const visitedNumbers = new Set();
    for (let number of list) {
        visitedNumbers.add(number);
        if (visitedNumbers.has(k-number)) {
            return true;
        }
    }
    return false;
}

console.log(doTwoNumbersSumUpToK([10, 15, 3, 7], 17));
console.log(doTwoNumbersSumUpToK([10, 15, 3, 7], 12));