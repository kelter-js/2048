import { WIN_VALUE } from "../constants";
import { GridData } from "../types";

export const isWinGame = (gameState: GridData) =>
  gameState.flat(Infinity).includes(WIN_VALUE);
