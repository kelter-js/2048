import { useEffect, useState } from "react";
import * as lodash from "lodash";

import { addRandomNumberInGrid } from "../utils/addRandomNumberInGrid";
import { INITIATE_FIELD } from "../constants";
import { GridData } from "../types";

export const useGameState = () => {
  const [gameState, setGameState] = useState(INITIATE_FIELD);
  const [gameOver, setGameOver] = useState(false);
  const [winGame, setWinGame] = useState(false);
  const [movesAmount, setMovesAmount] = useState(0);
  const [score, setScore] = useState(0);

  const handleInitiateStartData = (grid: GridData) => {
    addRandomNumberInGrid(grid);
    addRandomNumberInGrid(grid);
  };

  const resetGameState = () => {
    setGameOver(false);
    setWinGame(false);

    const emptyGrid = lodash.cloneDeep(INITIATE_FIELD);

    handleInitiateStartData(emptyGrid);
    setGameState(emptyGrid);
    setScore(0);
    setMovesAmount(0);
  };

  const initialize = () => {
    const newGrid = lodash.cloneDeep(gameState);

    handleInitiateStartData(newGrid);
    setGameState(newGrid);
  };

  useEffect(() => {
    initialize();
  }, []);

  const updateMovesAmount = () => {
    setMovesAmount((state) => state + 1);
  };

  return {
    resetGameState,
    gameState,
    setGameState,
    gameOver,
    setGameOver,
    winGame,
    setWinGame,
    movesAmount,
    updateMovesAmount,
    score,
    setScore,
  };
};
