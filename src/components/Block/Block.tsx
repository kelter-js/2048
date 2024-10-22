import { FC } from "react";

import {
  MIN_AMOUNT_OF_ROWS_AND_COLUMNS,
  AMOUNT_OF_ROWS_AND_COLUMNS,
} from "../../constants";
import { getColors } from "../../utils";
import { BlockProps } from "./types";
import { BlockTile } from "./Block.styled";

export const Block: FC<BlockProps> = ({ num }) => (
  <BlockTile
    key={num}
    customBackground={getColors(num)}
    isEven={
      num === MIN_AMOUNT_OF_ROWS_AND_COLUMNS ||
      num === AMOUNT_OF_ROWS_AND_COLUMNS
    }
  >
    {num !== 0 ? num : ""}
  </BlockTile>
);
