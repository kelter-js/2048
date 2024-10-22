import { StatisticsProps } from "../../Statistics/types";

export interface GameOverOverlayProps
  extends Omit<StatisticsProps, "isGameOver"> {
  onReset: VoidFunction;
  isGameOver: boolean;
  isGameWin: boolean;
}
