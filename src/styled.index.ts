import styled from "styled-components";

export const Title = styled("p")`
  display: flex;
  margin: 0px;
  font-weight: 700;
  font-size: 60px;
  color: var(--dark-brown);
  font-family: sans-serif;
`;

export const TitleContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 108px;
`;

export const Container = styled("div")`
  width: 425px;
  margin: auto;
  margin-top: 30px;
`;

export const Board = styled("div")`
  position: relative;
  height: max-content;
  width: max-content;
  margin: auto;
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
  background: var(--dark-orange);
`;

export const BlocksContainer = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const StatsContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
