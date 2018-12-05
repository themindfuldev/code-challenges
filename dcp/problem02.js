/*
Problem #2
This problem was asked by Uber.

Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.

For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6].

Follow-up: what if you can't use division?

// */
// function productOfAllButI(list) {
//     return list.map((itemI, i) => 
//             list.reduce((product, itemJ, j) => product * (i === j? 1 : itemJ), 1));
// }

function productOfAllButI(list) {
    const n = list.length;
    const itemsButI = [{product: 1, item: list[0]}];

    for (let i = 1; i < n; i++) {
        const previous = itemsButI[i - 1];
        const item = list[i];
        const product = previous.product * previous.item;
        itemsButI.push({ product, item });
    }

    let remainingSubProduct = 1;
    for (let i = n-1; i >= 0; i--) {        
        const current = itemsButI[i];
        current.product *= remainingSubProduct;
        remainingSubProduct *= current.item;
    }

    return itemsButI.map(({product}) => product);
}

console.log(productOfAllButI([1, 2, 3, 4, 5]));
console.log(productOfAllButI([3, 2, 1]));