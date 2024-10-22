import { FC } from "react";

import { NewGameButtonProps } from "./types";
import { ButtonContainer, ResetGameButton } from "./NewGameButton.styled";

const NEW_GAME_TEXT = "Новая игра";
const GAME_OVER_TEXT = "Попробовать снова";
const PLAY_AGAIN_TEXT = "Сыграть ещё!";

export const NewGameButton: FC<NewGameButtonProps> = ({
  onClick,
  isGameOver,
  isWinGame,
}) => {
  const getDescription = () => {
    if (isWinGame) {
      return PLAY_AGAIN_TEXT;
    }

    if (isGameOver) {
      return GAME_OVER_TEXT;
    }

    return NEW_GAME_TEXT;
  };

  return (
    <ButtonContainer>
      <ResetGameButton onClick={onClick}>{getDescription()}</ResetGameButton>
    </ButtonContainer>
  );
};
