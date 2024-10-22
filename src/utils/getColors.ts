import { COLORS } from "../entities/colors";

export const getColors = (num: number): string => {
  switch (num) {
    case 2:
      return COLORS.TWO;
    case 4:
      return COLORS.FOUR;
    case 8:
      return COLORS.EIGHT;
    case 16:
      return COLORS.SIXTEEN;
    case 32:
      return COLORS.THIRTY_TWO;
    case 64:
      return COLORS.SIXTY_FOUR;
    case 128:
      return COLORS.ONE_HUNDRED_TWENTY_EIGHT;
    case 256:
      return COLORS.TWO_HUNDRED_FIFTY_SIX;
    case 512:
      return COLORS.FIVE_HUNDRED_TWELVE;
    case 1024:
      return COLORS.ONE_THOUSAND_TWENTY_FOUR;
    case 2048:
      return COLORS.TWO_THOUSAND_FORTY_EIGHT;
    default:
      return COLORS.DEFAULT;
  }
};
