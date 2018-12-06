/*
You're working on a secret team solving coded transmissions.

Your team is scrambling to decipher a recent message, worried it's a plot to break into a major European National Cake Vault. The message has been mostly deciphered, but all the words are backward! Your colleagues have handed off the last step to you.

Write a function reverseWords() that takes a message as an array of characters and reverses the order of the words in place. ↴

Why an array of characters instead of a string?

The goal of this question is to practice manipulating strings in place. Since we're modifying the message, we need a mutable ↴ type like an array, instead of JavaScript's immutable strings.

For example:

  const message = [ 'c', 'a', 'k', 'e', ' ',
                'p', 'o', 'u', 'n', 'd', ' ',
                's', 't', 'e', 'a', 'l' ];

reverseWords(message);

console.log(message.join(''));
// Prints: 'steal pound cake'

When writing your function, assume the message contains only letters and spaces, and all words are separated by one space.
*/

// function reverseWords(message) {

//     // Decode the message by reversing the words
//     const words = message.join('').split(' ').reverse();
//     message.length = 0;
//     words.forEach((word, index) => {
//         const isLastWord = index === words.length - 1;
//         message.push(...word.split(''), ...(isLastWord ? '' : ' '));
//     });

// }

function reverseWords(message) {
    let indexFromLeft = 0;
    let indexFromRight = message.length - 1;
    while (indexFromLeft < indexFromRight) {
        debugger;
        // Getting left word
        let leftWord = '';
        const startLeftWord = indexFromLeft;
        while (message[indexFromLeft] !== ' ' && indexFromLeft <= indexFromRight) {
            leftWord += message[indexFromLeft];
            indexFromLeft++;
        }
        const endLeftWord = indexFromLeft - 1;
        
        // Getting right word
        let rightWord = ''; 
        const endRightWord = indexFromRight;
        while (message[indexFromRight] !== ' ' && indexFromRight >= 0) {
            rightWord = message[indexFromRight] + rightWord;
            indexFromRight--;
        }
        const startRightWord = indexFromRight + 1;

        if (indexFromLeft <= indexFromRight) {
            // Switch chars for both left and right words for the length of the smallest word
            const leftWordLength = leftWord.length;
            const rightWordLength = rightWord.length;
            const smallestWordLength = Math.min(leftWordLength, rightWordLength);
            for (let i = 0; i < smallestWordLength; i++) {
                message[startLeftWord + i] = rightWord[i];
                message[endRightWord - i] = leftWord[leftWordLength - 1 - i];
            }

            if (leftWord.length > rightWord.length) {
                // Shift the gap between left and right words back to the difference between them
                const remainingLeftWordLength = leftWordLength - rightWordLength;
                for (let i = endLeftWord; i < startRightWord; i++) {
                    message[i] = message[i + remainingLeftWordLength];
                }

                // Fill in the remaining letters from the left word onto the right space
                for (let i = remainingLeftWordLength - 1; i >=0; i--) {
                    message[startRightWord - 1 - i] = leftWord[i];
                }
            }
            else if (leftWord.length < rightWord.length) {
                // Shift the gap between left and right words back to the difference between them
                const remainingRightWordLength = rightWordLength - leftWordLength;
                for (let i = endRightWord-leftWordLength; i > endLeftWord; i--) {
                    message[i] = message[i - remainingRightWordLength];
                }

                // Fill in the remaining letters from the right word onto the left space
                for (let i = 0; i < remainingRightWordLength; i++) {
                    message[endLeftWord + 1 + i] = rightWord[leftWordLength + i];
                }
            }
            
            indexFromLeft = startLeftWord + rightWordLength + 1;
            indexFromRight = endRightWord - leftWordLength - 1;
        }
    }
}

// Tests
let desc = 'one word';
let input = 'vault'.split('');
reverseWords(input);
let actual = input.join('');
let expected = 'vault';
assertEqual(actual, expected, desc);

desc = 'two words';
input = 'thief cake'.split('');
reverseWords(input);
actual = input.join('');
expected = 'cake thief';
assertEqual(actual, expected, desc);

desc = 'three words';
input = 'one another get'.split('');
reverseWords(input);
actual = input.join('');
expected = 'get another one';
assertEqual(actual, expected, desc);

desc = 'multiple words same length';
input = 'rat the ate cat the'.split('');
reverseWords(input);
actual = input.join('');
expected = 'the cat ate the rat';
assertEqual(actual, expected, desc);

desc = 'multiple words different lengths';
input = 'yummy is cake bundt chocolate'.split('');
reverseWords(input);
actual = input.join('');
expected = 'chocolate bundt cake is yummy';
assertEqual(actual, expected, desc);

desc = 'empty string';
input = ''.split('');
reverseWords(input);
actual = input.join('');
expected = '';
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
}