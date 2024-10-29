import { FC } from "react";

import { GAME_WIN_DESCRIPTION, GAME_OVER_DESCRIPTION } from "../../constants";
import { NewGameButton } from "../NewGameButton";
import { GameOverOverlayProps } from "./types";
import { Statistics } from "../Statistics";
import { GameOverContainer, Header } from "./GameOverOverlay.styled";

export const GameOverOverlay: FC<GameOverOverlayProps> = ({
  onReset,
  isGameOver,
  isGameWin,
  score,
  movesAmount,
}) => {
  if (!isGameOver && !isGameWin) {
    return null;
  }

  return (
    <GameOverContainer>
      <div>
        {isGameOver && <Header>{GAME_OVER_DESCRIPTION}</Header>}
        {isGameWin && <Header>{GAME_WIN_DESCRIPTION}</Header>}

        <Statistics
          score={score}
          movesAmount={movesAmount}
          isGameOver={isGameOver || isGameWin}
        />

        <NewGameButton
          onClick={onReset}
          isGameOver={isGameOver}
          isWinGame={isGameWin}
        />
      </div>
    </GameOverContainer>
  );
};
