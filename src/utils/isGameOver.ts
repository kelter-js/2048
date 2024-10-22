import { MOVEMENTS } from "../entities/movements";
import { GridData } from "../types";
import { isEqual } from "./isEqual";

export const isGameOver = (
  gameState: GridData,
  swiper: (direction: MOVEMENTS) => GridData
): boolean => {
  const swipeDirections = Object.values(MOVEMENTS);

  for (const swipeDirection of swipeDirections) {
    const potentialMove = swiper(swipeDirection);

    if (isEqual(gameState, potentialMove)) {
      return false;
    }
  }

  return true;
};
