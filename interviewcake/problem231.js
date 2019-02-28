/*
Write an efficient function that checks whether any permutation ↴ of an input string is a palindrome. ↴

You can assume the input string only contains lowercase letters.

Examples:

"civic" should return True
"ivicc" should return True
"civil" should return False
"livci" should return False
"But 'ivicc' isn't a palindrome!"

If you had this thought, read the question again carefully. We're asking if any permutation of the string is a palindrome. Spend some extra time ensuring you fully understand the question before starting. Jumping in with a flawed understanding of the problem doesn't look good in an interview.
*/

function hasPalindromePermutation(theString) {
    const unpairedCharacters = new Set();
    for (let c of theString) {
      if (unpairedCharacters.has(c)) {
        unpairedCharacters.delete(c); 
      }
      else {
        unpairedCharacters.add(c);
      }
    }
    
    return unpairedCharacters.size <= 1;
}

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // Tests
  
  let desc = 'permutation with odd number of chars';
  assertEqual(hasPalindromePermutation('aabcbcd'), true, desc);
  
  desc = 'permutation with even number of chars';
  assertEqual(hasPalindromePermutation('aabccbdd'), true, desc);
  
  desc = 'no permutation with odd number of chars';
  assertEqual(hasPalindromePermutation('aabcd'), false, desc);
  
  desc = 'no permutation with even number of chars';
  assertEqual(hasPalindromePermutation('aabbcd'), false, desc);
  
  desc = 'empty string';
  assertEqual(hasPalindromePermutation(''), true, desc);
  
  desc = 'one character string ';
  assertEqual(hasPalindromePermutation('a'), true, desc);
  
  function assertEqual(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
  }