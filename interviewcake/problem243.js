function findHighestNotBreakingFloor(egg) {
    let sequence = 15;
    let highestFloorNotBreaking = 0;
    let lowestFloorBreaking = 100;
    let currentFloor;
    let drops = 0;

    do {
      currentFloor = highestFloorNotBreaking + sequence;
      drops++;
      if (egg.willItBreak(currentFloor)) {
        lowestFloorBreaking = currentFloor;
        currentFloor = highestFloorNotBreaking;
        do {
          currentFloor++;
          drops++;
          if (egg.willItBreak(currentFloor)) {
            console.log('drops='+drops);
            return currentFloor-1;
          }
        } while (currentFloor < lowestFloorBreaking - 2);
        console.log('drops='+drops);
        return currentFloor+1;
      }
      else {
        highestFloorNotBreaking = currentFloor;
        sequence--;
      }
    } while (currentFloor < lowestFloorBreaking);
  }

  class Egg {
    constructor() {
      this.maximumFloor = Math.floor(Math.random() * 100) + 1;
    }

    willItBreak(floor) {
      return floor > this.maximumFloor;
    }
  }

  const egg = new Egg();
  console.log('highest floor not breaking = ' + findHighestNotBreakingFloor(egg));
  console.log(JSON.stringify(egg));
