import styled from "styled-components";

export const ButtonContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ResetGameButton = styled("button")`
  padding: 10px;
  background: var(--confirm-color);
  color: var(--grey);

  border-radius: 7px;
  font-weight: 900;
  border: none;
  white-space: nowrap;
  cursor: pointer;
  text-transform: uppercase;
`;
