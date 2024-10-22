import { FC } from "react";

import { StatisticsProps } from "./types";
import * as S from "./Statistics.styled";

export const Statistics: FC<StatisticsProps> = ({
  score,
  movesAmount,
  isGameOver,
}) => (
  <S.MainContainer isGameOver={isGameOver}>
    <S.Container>
      <S.Title>Ходы:</S.Title>
      <S.StatisticData isGameOver={isGameOver}>{movesAmount}</S.StatisticData>
    </S.Container>
    <S.Container>
      <S.Title>Очки:</S.Title>
      <S.StatisticData isGameOver={isGameOver}>{score}</S.StatisticData>
    </S.Container>
  </S.MainContainer>
);
