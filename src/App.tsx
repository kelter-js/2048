import Swipe from "react-easy-swipe";

import { UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW } from "./constants";
import {
  addRandomNumberInGrid,
  movementService,
  isGameOver,
  isWinGame,
  isEqual,
} from "./utils";
import { GameOverOverlay } from "./components/GameOverOverlay";
import { NewGameButton } from "./components/NewGameButton";
import { useGameState } from "./hooks/useGameState";
import { MOVEMENTS } from "./entities/movements";
import { Block } from "./components/Block/";
import { useEvent } from "./hooks/useEvent";
import { Rules } from "./components/Rules";
import { Row } from "./components/Row";
import { GridData } from "./types";
import * as S from "./styled.index";
import "./App.css";
import { Statistics } from "./Statistics";

const App = () => {
  const {
    gameState,
    setGameState,
    resetGameState,
    gameOver,
    setGameOver,
    winGame,
    setWinGame,
    movesAmount,
    updateMovesAmount,
    score,
    setScore,
  } = useGameState();

  const handleAddNumber = (oldGrid: GridData, newGrid: GridData) => {
    if (isEqual(oldGrid, newGrid)) {
      addRandomNumberInGrid(newGrid);
    }
  };

  const handleMovement = (direction: MOVEMENTS) => {
    switch (direction) {
      case MOVEMENTS.LEFT: {
        return movementService.moveLeft(gameState);
      }

      case MOVEMENTS.RIGHT: {
        return movementService.moveRight(gameState);
      }

      case MOVEMENTS.DOWN: {
        return movementService.moveDown(gameState);
      }

      case MOVEMENTS.UP: {
        return movementService.moveUp(gameState);
      }

      default: {
        return { scoreCounter: 0, newGrid: gameState };
      }
    }
  };

  const mutateSwipe = (direction: MOVEMENTS) => {
    const oldGrid = gameState;
    const { scoreCounter, newGrid } = handleMovement(direction);

    setScore((state) => state + scoreCounter);

    handleAddNumber(oldGrid, newGrid);

    return newGrid;
  };

  const handleKeyDown = (event: any) => {
    if (gameOver) {
      return;
    }

    switch (event.keyCode) {
      case UP_ARROW:
        setGameState(mutateSwipe(MOVEMENTS.UP));
        updateMovesAmount();
        break;

      case DOWN_ARROW:
        setGameState(mutateSwipe(MOVEMENTS.DOWN));
        updateMovesAmount();
        break;

      case LEFT_ARROW:
        setGameState(mutateSwipe(MOVEMENTS.LEFT));
        updateMovesAmount();
        break;

      case RIGHT_ARROW:
        setGameState(mutateSwipe(MOVEMENTS.RIGHT));
        updateMovesAmount();
        break;

      default:
        break;
    }

    if (isWinGame(gameState)) {
      setWinGame(true);
      return;
    }

    if (isGameOver(gameState, mutateSwipe)) {
      setGameOver(true);
    }
  };

  useEvent("keydown", handleKeyDown);

  const handleSwipeLeft = () => {
    setGameState(mutateSwipe(MOVEMENTS.LEFT));
  };

  const handleSwipeRight = () => {
    setGameState(mutateSwipe(MOVEMENTS.RIGHT));
  };

  const handleSwipeDown = () => {
    setGameState(mutateSwipe(MOVEMENTS.DOWN));
  };

  const handleSwipeUp = () => {
    setGameState(mutateSwipe(MOVEMENTS.UP));
  };

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>2048</S.Title>

        {!gameOver && !winGame && (
          <S.StatsContainer>
            <Statistics movesAmount={movesAmount} score={score} />
            <NewGameButton onClick={resetGameState} isGameOver={gameOver} />
          </S.StatsContainer>
        )}
      </S.TitleContainer>

      <S.Board>
        <GameOverOverlay
          onReset={resetGameState}
          isGameOver={gameOver}
          isGameWin={winGame}
          movesAmount={movesAmount}
          score={score}
        />

        <Swipe
          onSwipeDown={handleSwipeDown}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          onSwipeUp={handleSwipeUp}
          style={{ overflowY: "hidden" }}
        >
          <S.BlocksContainer>
            {gameState.map((row, index) => (
              <Row key={index}>
                {row.map((digit, index) => (
                  <Block num={digit} key={index} />
                ))}
              </Row>
            ))}
          </S.BlocksContainer>
        </Swipe>
      </S.Board>

      <Rules />
    </S.Container>
  );
};

export default App;
