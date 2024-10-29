import styled from "styled-components";

export const Title = styled("p")`
  color: var(--dark-brown);
  font-size: 22px;
`;

export const StatisticData = styled("p").withConfig({
  shouldForwardProp: (prop) => !["isGameOver"].includes(prop),
})<{ isGameOver?: boolean }>`
  color: var(--dark-brown);
  font-size: 18px;
  font-weight: 700;
  text-align: ${({ isGameOver }) => (isGameOver ? "center" : "left")};
`;

export const MainContainer = styled("div").withConfig({
  shouldForwardProp: (prop) => !["isGameOver"].includes(prop),
})<{ isGameOver?: boolean }>`
  display: flex;
  flex-direction: ${({ isGameOver }) => (isGameOver ? "row" : "column")};
  justify-content: ${({ isGameOver }) =>
    isGameOver ? "space-around" : "unset"};
  margin-bottom: 10px;
  margin-left: ${({ isGameOver }) => (isGameOver ? "0" : "10px")};
  padding-left: ${({ isGameOver }) => (isGameOver ? "0" : "10px")};
  border-left: ${({ isGameOver }) =>
    isGameOver ? "none" : "3px solid var(--dark-brown)"};

  & p {
    margin: 0;
  }
`;

export const Container = styled("div")`
  display: flex;
  flex-direction: column;
`;
