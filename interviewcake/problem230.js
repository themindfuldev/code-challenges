/*
You have a function rand5() that generates a random integer from 1 to 5. Use it to write a function rand7() that generates a random integer from 1 to 7.

rand5() returns each integer with equal probability. rand7() must also return each integer with equal probability.
*/
function rand5() {
  return Math.floor(Math.random() * (5 - 1 + 1)) + 1;
}

function rand7() {
  let result = 0;
  
  while (result === 0) {
    const row = rand5();
    const col = rand5();
    
    mult = ((row-1) * 5 + (col-1)) + 1;
    if (mult < 22) 
      result = mult % 7;
  }
  
  return result;
}


for (let i = 0; i < 14; i++) {
  console.log(rand7());
}