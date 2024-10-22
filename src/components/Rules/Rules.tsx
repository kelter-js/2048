import { RulesContainer, Description } from "./Rules.styled";

export const Rules = () => (
  <RulesContainer>
    <Description>
      <strong>Как играть:</strong> Используйте свои <strong>стрелки</strong>,
      чтобы перемещать плитки. Когда две плитки с одинаковым номером
      соприкасаются, они <strong>сливаются в одну!</strong>
    </Description>
  </RulesContainer>
);
