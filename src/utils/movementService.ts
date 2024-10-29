import * as lodash from "lodash";

import { GridData } from "../types";
import { MOVEMENTS } from "../entities/movements";

export const movementService = {
  moveLeft(grid: GridData) {
    const newGrid = lodash.cloneDeep(grid);
    let scoreCounter = 0;

    for (let rowIndex = 0; rowIndex < 4; rowIndex++) {
      const currentRow = newGrid[rowIndex];
      let mergeIndex = 0;
      let checkIndex = 1;

      while (mergeIndex < 4) {
        if (checkIndex === 4) {
          checkIndex = mergeIndex + 1;
          mergeIndex++;
          continue;
        }

        const currentValue = currentRow[mergeIndex];
        const nextValue = currentRow[checkIndex];

        if (currentValue === 0 && nextValue === 0) {
          checkIndex++;
        } else if (currentValue === 0 && nextValue !== 0) {
          currentRow[mergeIndex] = nextValue;
          currentRow[checkIndex] = 0;
          checkIndex++;
        } else if (currentValue !== 0 && nextValue === 0) {
          checkIndex++;
        } else if (currentValue !== 0 && nextValue !== 0) {
          if (currentValue === nextValue) {
            currentRow[mergeIndex] += nextValue;
            scoreCounter += currentRow[mergeIndex];

            currentRow[checkIndex] = 0;
            checkIndex = mergeIndex + 1;
            mergeIndex++;
          } else {
            mergeIndex++;
            checkIndex = mergeIndex + 1;
          }
        }
      }
    }

    return { scoreCounter, newGrid };
  },

  moveRight(grid: GridData) {
    const newGrid = lodash.cloneDeep(grid);
    let scoreCounter = 0;

    for (let i = 3; i >= 0; i--) {
      const currentRow = newGrid[i];
      let mergeIndex = 3;
      let checkIndex = 2;

      while (mergeIndex > 0) {
        if (checkIndex === -1) {
          checkIndex = mergeIndex - 1;
          mergeIndex--;
          continue;
        }

        if (currentRow[mergeIndex] === 0 && currentRow[checkIndex] === 0) {
          checkIndex--;
        } else if (
          currentRow[mergeIndex] === 0 &&
          currentRow[checkIndex] !== 0
        ) {
          currentRow[mergeIndex] = currentRow[checkIndex];
          currentRow[checkIndex] = 0;
          checkIndex--;
        } else if (
          currentRow[mergeIndex] !== 0 &&
          currentRow[checkIndex] === 0
        ) {
          checkIndex--;
        } else if (
          currentRow[mergeIndex] !== 0 &&
          currentRow[checkIndex] !== 0
        ) {
          if (currentRow[mergeIndex] === currentRow[checkIndex]) {
            currentRow[mergeIndex] += currentRow[checkIndex];
            scoreCounter += currentRow[mergeIndex];
            currentRow[checkIndex] = 0;
            checkIndex = mergeIndex - 1;
            mergeIndex--;
          } else {
            mergeIndex--;
            checkIndex = mergeIndex - 1;
          }
        }
      }
    }

    return { scoreCounter, newGrid };
  },

  moveUp(grid: GridData) {
    const newGrid = lodash.cloneDeep(grid);
    let scoreCounter = 0;

    for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
      let mergeIndex = 0;
      let checkIndex = 1;

      while (mergeIndex < 4) {
        if (checkIndex === 4) {
          checkIndex = mergeIndex + 1;
          mergeIndex++;
          continue;
        }

        const currentValue = newGrid[mergeIndex][columnIndex];
        const nextValue = newGrid[checkIndex][columnIndex];

        if (currentValue === 0 && nextValue === 0) {
          checkIndex++;
        } else if (currentValue === 0 && nextValue !== 0) {
          newGrid[mergeIndex][columnIndex] = nextValue;
          newGrid[checkIndex][columnIndex] = 0;
          checkIndex++;
        } else if (currentValue !== 0 && nextValue === 0) {
          checkIndex++;
        } else if (currentValue !== 0 && nextValue !== 0) {
          if (currentValue === nextValue) {
            newGrid[mergeIndex][columnIndex] += nextValue;
            scoreCounter += newGrid[mergeIndex][columnIndex];
            newGrid[checkIndex][columnIndex] = 0;
            checkIndex = mergeIndex + 1;
            mergeIndex++;
          } else {
            mergeIndex++;
            checkIndex = mergeIndex + 1;
          }
        }
      }
    }

    return { scoreCounter, newGrid };
  },

  moveDown(grid: GridData) {
    const newGrid = lodash.cloneDeep(grid);
    let scoreCounter = 0;

    for (let columnIndex = 0; columnIndex < 4; columnIndex++) {
      let mergeIndex = newGrid.length - 1;
      let checkIndex = mergeIndex - 1;

      while (mergeIndex > 0) {
        if (checkIndex < 0) {
          checkIndex = mergeIndex - 1;
          mergeIndex--;
          continue;
        }

        const currentValue = newGrid[mergeIndex][columnIndex];
        const nextValue = newGrid[checkIndex][columnIndex];

        if (currentValue === 0 && nextValue === 0) {
          checkIndex--;
        } else if (currentValue === 0 && nextValue !== 0) {
          newGrid[mergeIndex][columnIndex] = nextValue;
          newGrid[checkIndex][columnIndex] = 0;
          checkIndex--;
        } else if (currentValue !== 0 && nextValue === 0) {
          checkIndex--;
        } else if (currentValue !== 0 && nextValue !== 0) {
          if (currentValue === nextValue) {
            newGrid[mergeIndex][columnIndex] += nextValue;
            scoreCounter += newGrid[mergeIndex][columnIndex];
            newGrid[checkIndex][columnIndex] = 0;
            checkIndex = mergeIndex - 1;
            mergeIndex--;
          } else {
            mergeIndex--;
            checkIndex = mergeIndex - 1;
          }
        }
      }
    }

    return { scoreCounter, newGrid };
  },

  handleMovement(direction: MOVEMENTS, gameState: GridData) {
    switch (direction) {
      case MOVEMENTS.LEFT: {
        return this.moveLeft(gameState);
      }

      case MOVEMENTS.RIGHT: {
        return this.moveRight(gameState);
      }

      case MOVEMENTS.DOWN: {
        return this.moveDown(gameState);
      }

      case MOVEMENTS.UP: {
        return this.moveUp(gameState);
      }

      default: {
        return { scoreCounter: 0, newGrid: gameState };
      }
    }
  },
};
