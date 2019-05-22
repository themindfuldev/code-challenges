/*
Write a function fib() that takes an integer nn and returns the nnth Fibonacci ↴ number.

Let's say our Fibonacci series is 0-indexed and starts with 0. So:

  fib(0);  // => 0
fib(1);  // => 1
fib(2);  // => 1
fib(3);  // => 2
fib(4);  // => 3
...
*/
function fib(n) {
    if (n < 0) throw new Error();
    if (n === 0 || n === 1) return n;

    let a = 0, b = 1, fib;

    for (let i = 2; i <= n; i++) {
      fib = a + b;
      a = b;
      b = fib;
    }

    return fib;
  }


















  // Tests

  let desc = 'zeroth fibonacci';
  let actual = fib(0);
  let expected = 0;
  assertEqual(actual, expected, desc);

  desc = 'first fibonacci';
  actual = fib(1);
  expected = 1;
  assertEqual(actual, expected, desc);

  desc = 'second fibonacci';
  actual = fib(2);
  expected = 1;
  assertEqual(actual, expected, desc);

  desc = 'third fibonacci';
  actual = fib(3);
  expected = 2;
  assertEqual(actual, expected, desc);

  desc = 'fifth fibonacci';
  actual = fib(5);
  expected = 5;
  assertEqual(actual, expected, desc);

  desc = 'tenth fibonacci';
  actual = fib(10);
  expected = 55;
  assertEqual(actual, expected, desc);

  desc = 'negative fibonacci';
  const negativeFib = () => (fib(-1));
  assertThrowsError(negativeFib, desc);

  function assertEqual(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`)
    }
  }

  function assertThrowsError(func, desc) {
    try {
      func();
      console.log(`${desc} ... FAIL`);
    } catch (e) {
      console.log(`${desc} ... PASS`);
    }
  }