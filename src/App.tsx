import { useSwipeable } from "react-swipeable";

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
import { Statistics } from "./Statistics";
import { Row } from "./components/Row";
import { GridData } from "./types";
import * as S from "./styled.index";
import "./App.css";

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
    const { newGrid } = handleMovement(direction);

    return newGrid;
  };

  const handleSwipe = (direction: MOVEMENTS) => {
    const { scoreCounter, newGrid } = handleMovement(direction);

    if (isEqual(gameState, newGrid)) {
      updateMovesAmount();
      setScore((state) => state + scoreCounter);
      handleAddNumber(gameState, newGrid);
    }

    return newGrid;
  };

  const handleGameStateChange = () => {
    if (isWinGame(gameState)) {
      setWinGame(true);
      return;
    }

    if (isGameOver(gameState, mutateSwipe)) {
      setGameOver(true);
    }
  };

  const handleKeyDown = (event: any) => {
    if (gameOver) {
      return;
    }

    switch (event.keyCode) {
      case UP_ARROW: {
        setGameState(handleSwipe(MOVEMENTS.UP));

        break;
      }

      case DOWN_ARROW: {
        setGameState(handleSwipe(MOVEMENTS.DOWN));

        break;
      }

      case LEFT_ARROW: {
        setGameState(handleSwipe(MOVEMENTS.LEFT));

        break;
      }

      case RIGHT_ARROW: {
        setGameState(handleSwipe(MOVEMENTS.RIGHT));

        break;
      }

      default:
        break;
    }

    handleGameStateChange();
  };

  useEvent("keydown", handleKeyDown);

  const handleSwipeLeft = () => {
    setGameState(handleSwipe(MOVEMENTS.LEFT));
    handleGameStateChange();
  };

  const handleSwipeRight = () => {
    setGameState(handleSwipe(MOVEMENTS.RIGHT));
    handleGameStateChange();
  };

  const handleSwipeDown = () => {
    setGameState(handleSwipe(MOVEMENTS.DOWN));
    handleGameStateChange();
  };

  const handleSwipeUp = () => {
    setGameState(handleSwipe(MOVEMENTS.UP));
    handleGameStateChange();
  };

  const handlers = useSwipeable({
    onSwipedDown: handleSwipeDown,
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    onSwipedUp: handleSwipeUp,
    preventScrollOnSwipe: true,
  });

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

        <div {...handlers} style={{ overflowY: "hidden" }}>
          <S.BlocksContainer>
            {gameState.map((row, index) => (
              <Row key={index}>
                {row.map((digit, index) => (
                  <Block num={digit} key={index} />
                ))}
              </Row>
            ))}
          </S.BlocksContainer>
        </div>
      </S.Board>

      <Rules />
    </S.Container>
  );
};

export default App;
