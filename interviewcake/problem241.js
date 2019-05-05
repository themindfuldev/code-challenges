/*
A crack team of love scientists from OkEros (a hot new dating site) have devised a way to represent dating profiles as rectangles on a two-dimensional plane.

They need help writing an algorithm to find the intersection of two users' love rectangles. They suspect finding that intersection is the key to a matching algorithm so powerful it will cause an immediate acquisition by Google or Facebook or Obama or something.

Two rectangles overlapping a little. It must be love.
Write a function to find the rectangular intersection of two given love rectangles.

As with the example above, love rectangles are always "straight" and never "diagonal." More rigorously: each side is parallel with either the x-axis or the y-axis.

They are defined as objects ↴ like this:

  const myRectangle = {

  // Coordinates of bottom-left corner
  leftX: 1,
  bottomY: 1,

  // Width and height
  width: 6,
  height: 3,
};

Your output rectangle should use this format as well.
*/
function findRectangularOverlap(rect1, rect2) {
  const getDimension = (point1, length1, point2, length2) => {
    point = Math.max(point1, point2);
    length = Math.min(point1 + length1, point2 + length2) - point;
    return [point, length];
  };

  const [leftX, width] = getDimension(rect1.leftX, rect1.width, rect2.leftX, rect2.width);
  const [bottomY, height] = getDimension(rect1.bottomY, rect1.height, rect2.bottomY, rect2.height);

  return width > 0 && height > 0 ?
    { leftX, bottomY, width, height } :
    { leftX: 0, bottomY: 0, width: 0, height: 0 };
}

// Tests

let desc = 'overlap along both axes';
let rect1 = { leftX: 1, bottomY: 1, width: 6, height: 3 };
let rect2 = { leftX: 5, bottomY: 2, width: 3, height: 6 };
let actual = findRectangularOverlap(rect1, rect2);
let expected = { leftX: 5, bottomY: 2, width: 2, height: 2 };
assertObjectEquals(actual, expected, desc);

desc = 'one rectangle inside another';
rect1 = { leftX: 1, bottomY: 1, width: 6, height: 6 };
rect2 = { leftX: 3, bottomY: 3, width: 2, height: 2 };
actual = findRectangularOverlap(rect1, rect2);
expected = { leftX: 3, bottomY: 3, width: 2, height: 2 };
assertObjectEquals(actual, expected, desc);

desc = 'both rectangles the same';
rect1 = { leftX: 2, bottomY: 2, width: 4, height: 4 };
rect2 = { leftX: 2, bottomY: 2, width: 4, height: 4 };
actual = findRectangularOverlap(rect1, rect2);
expected = { leftX: 2, bottomY: 2, width: 4, height: 4 };
assertObjectEquals(actual, expected, desc);

desc = 'touch on horizontal edge';
rect1 = { leftX: 1, bottomY: 2, width: 3, height: 4 };
rect2 = { leftX: 2, bottomY: 6, width: 2, height: 2 };
actual = findRectangularOverlap(rect1, rect2);
expected = { leftX: 0, bottomY: 0, width: 0, height: 0 };
assertObjectEquals(actual, expected, desc);

desc = 'touch on vertical edge';
rect1 = { leftX: 1, bottomY: 2, width: 3, height: 4 };
rect2 = { leftX: 4, bottomY: 3, width: 2, height: 2 };
actual = findRectangularOverlap(rect1, rect2);
expected = { leftX: 0, bottomY: 0, width: 0, height: 0 };
assertObjectEquals(actual, expected, desc);

desc = 'touch at a corner';
rect1 = { leftX: 1, bottomY: 1, width: 2, height: 2 };
rect2 = { leftX: 3, bottomY: 3, width: 2, height: 2 };
actual = findRectangularOverlap(rect1, rect2);
expected = { leftX: 0, bottomY: 0, width: 0, height: 0 };
assertObjectEquals(actual, expected, desc);

desc = 'no overlap';
rect1 = { leftX: 1, bottomY: 1, width: 2, height: 2 };
rect2 = { leftX: 4, bottomY: 6, width: 3, height: 6 };
actual = findRectangularOverlap(rect1, rect2);
expected = { leftX: 0, bottomY: 0, width: 0, height: 0 };
assertObjectEquals(actual, expected, desc);

function assertObjectEquals(a, b, desc) {
  const objectA = JSON.stringify(a);
  const objectB = JSON.stringify(b);
  if (objectA !== objectB) {
    console.log(`${desc} ... FAIL: ${objectA} != ${objectB}`)
  } else {
    console.log(`${desc} ... PASS`);
  }
}