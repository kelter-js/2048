import {
  AMOUNT_OF_ROWS_AND_COLUMNS,
  MAX_ATTEMPTS,
  MIN_AMOUNT_OF_ROWS_AND_COLUMNS,
} from "../constants";
import { GridData } from "../types";

export const addRandomNumberInGrid = (grid: GridData) => {
  let numberPlaced = false;

  for (let attempt = 0; attempt < MAX_ATTEMPTS && !numberPlaced; attempt++) {
    const row = Math.floor(Math.random() * AMOUNT_OF_ROWS_AND_COLUMNS);
    const col = Math.floor(Math.random() * AMOUNT_OF_ROWS_AND_COLUMNS);

    if (grid[row][col] === 0) {
      grid[row][col] =
        Math.random() > 0.5
          ? MIN_AMOUNT_OF_ROWS_AND_COLUMNS
          : AMOUNT_OF_ROWS_AND_COLUMNS;
      numberPlaced = true;
    }
  }
};
