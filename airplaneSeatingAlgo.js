const generateSeats = (grid) => {
  let markedSeats = [];
  for (var i = 0; i < grid.length; i++) {
    let rows = grid[i][1];
    let cols = grid[i][0];
    let blockSeats = [];
    for (let j = 0; j < rows; j++) {
      let rowArray = [];
      for (let k = 0; k < cols; k++) {
        if ((k == 0 && i == 0) || (k == cols - 1 && i == grid.length - 1)) {
          rowArray.push("W");
        } else if ((k == 0 && i > 0) || k == cols - 1) {
          rowArray.push("A");
        } else {
          rowArray.push("M");
        }
      }
      blockSeats.push(rowArray);
    }
    markedSeats.push(blockSeats);
  }
  return markedSeats;
};

const assignNumbersToSeats = (
  maxRow,
  blocks,
  seatCounter,
  seatCode,
  totalPassenger
) => {
  for (let row = 0; row < maxRow; row++) {
    for (let i = 0; i < blocks.length; i++) {
      let currentRow = blocks[i][row];
      if (currentRow) {
        for (let seat = 0; seat < currentRow.length; seat++) {
          // Assign Seat numbere if seat code matches
          if (currentRow[seat] === seatCode && seatCounter < totalPassenger) {
            seatCounter = seatCounter + 1;
            currentRow[seat] = seatCounter;
          } else if (
            currentRow[seat] === seatCode &&
            seatCounter >= totalPassenger
          ) {
            seatCounter = seatCounter + 1;
            currentRow[seat] = " ";
          }
        }
      }
    }
  }
  return [blocks, seatCounter];
};

const airplaneSeatingalgodriver = (PlanSeatingGrid, totalPassengerCount) => {
  const finalSeatingMap = generateSeats(PlanSeatingGrid);
  let totalPassenger = totalPassengerCount;
  let maxRow = 0;

  for (let i = 0; i < PlanSeatingGrid.length; i++) {
    let row = PlanSeatingGrid[i][1];
    if (row > maxRow) {
      maxRow = row;
    }
  }

  let [assignBlockA, seatCountA] = assignNumbersToSeats(
    maxRow,
    finalSeatingMap,
    0,
    "A",
    totalPassenger
  );

  let [assignBlockW, seatCountW] = assignNumbersToSeats(
    maxRow,
    assignBlockA,
    seatCountA,
    "W",
    totalPassenger
  );
  let [assignBlockM] = assignNumbersToSeats(
    maxRow,
    assignBlockW,
    seatCountW,
    "M",
    totalPassenger
  );

  return assignBlockM;
};
console.log(
  airplaneSeatingalgodriver(
    [
      [3, 2],
      [4, 3],
      [2, 3],
      [3, 4],
    ],
    30
  )
);
