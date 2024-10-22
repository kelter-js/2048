import { FC, PropsWithChildren } from "react";
import { Container } from "./Row.styled";

export const Row: FC<PropsWithChildren> = ({ children }) => (
  <Container>{children}</Container>
);
