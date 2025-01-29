import { Typography } from "@mui/material";

import type { WeaponElementalType } from "../../../definitions/elemental-type";
import {
  NumericStringInteger,
  NumericStringPercentage2dp,
} from "../../common/NumericString/NumericString";
import { ElementalStyledText } from "../../elemental/ElementalStyledText/ElementalStyledText";

export interface BuffLineProps {
  displayName: string;
  element: WeaponElementalType;
  totalValue: number;
  isPercentageValue: boolean;
}

export function BuffLine({
  displayName,
  element,
  totalValue,
  isPercentageValue,
}: BuffLineProps) {
  return (
    <Typography>
      {displayName} :{" "}
      <ElementalStyledText elementalType={element}>
        {isPercentageValue ? (
          <NumericStringPercentage2dp value={totalValue} />
        ) : (
          <NumericStringInteger value={totalValue} />
        )}
      </ElementalStyledText>
    </Typography>
  );
}
