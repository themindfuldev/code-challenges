/*
In order to win the prize for most cookies sold, my friend Alice and I are going to merge our Girl Scout Cookies orders and enter as one unit.

Each order is represented by an "order id" (an integer).

We have our lists of orders sorted numerically already, in arrays. Write a function to merge our arrays of orders into one sorted array.

For example:

  var myArray     = [3, 4, 6, 10, 11, 15];
var alicesArray = [1, 5, 8, 12, 14, 19];

console.log(mergeArrays(myArray, alicesArray));
// logs [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]
*/
function mergeArrays(array1, array2) {
    const merged = [];
    let i1 = 0, i2 = 0;
    let n1 = array1.length, n2 = array2.length;

    while (i1 < n1 || i2 < n2) {
        const e1 = array1[i1], e2 = array2[i2];
        if (i2 === n2 || e1 <= e2) {
            merged.push(e1);
            i1++;
        }
        else {
            merged.push(e2);
            i2++;
        }
    }

    merged

    return merged;
}

var myArray = [3, 4, 6, 10, 11, 15];
var alicesArray = [1, 5, 8, 12, 14, 16, 16, 16, 19, 19, 20];

console.log(mergeArrays(myArray, alicesArray));