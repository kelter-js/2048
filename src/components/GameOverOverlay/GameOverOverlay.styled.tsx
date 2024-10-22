import styled from "styled-components";

export const GameOverContainer = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  border-radius: 5px;
  background: var(--beige);
`;

export const Header = styled("p")`
  font-size: 30px;
  font-family: sans-serif;
  font-weight: 900;
  color: var(--dark-brown);
  margin: 0px;
`;
