import { useSwipeable } from "react-swipeable";

import {
  addRandomNumberInGrid,
  movementService,
  isGameOver,
  isWinGame,
  isEqual,
} from "./utils";
import {
  GameOverOverlay,
  NewGameButton,
  Statistics,
  Block,
  Rules,
  Row,
} from "./components";
import { UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW } from "./constants";
import { useGameState } from "./hooks/useGameState";
import { useEvent } from "./hooks/useEvent";
import { MOVEMENTS } from "./entities/movements";
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

  const mutateSwipe = (direction: MOVEMENTS) => {
    const { newGrid } = movementService.handleMovement(direction, gameState);

    return newGrid;
  };

  const handleSwipe = (direction: MOVEMENTS) => {
    const { scoreCounter, newGrid } = movementService.handleMovement(
      direction,
      gameState
    );

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

  const swipeConfig = {
    onSwipedDown: () => {
      setGameState(handleSwipe(MOVEMENTS.DOWN));
      handleGameStateChange();
    },
    onSwipedLeft: () => {
      setGameState(handleSwipe(MOVEMENTS.LEFT));
      handleGameStateChange();
    },
    onSwipedRight: () => {
      setGameState(handleSwipe(MOVEMENTS.RIGHT));
      handleGameStateChange();
    },
    onSwipedUp: () => {
      setGameState(handleSwipe(MOVEMENTS.UP));
      handleGameStateChange();
    },
    preventScrollOnSwipe: true,
  };

  const handlers = useSwipeable(swipeConfig);

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
