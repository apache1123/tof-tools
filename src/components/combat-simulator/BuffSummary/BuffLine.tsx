import { Typography } from "@mui/material";

import type { WeaponElementalType } from "../../../definitions/elemental-type";
import { NumericString } from "../../common/NumericString/NumericString";
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
          <NumericString value={totalValue} variant="percentage2dp" />
        ) : (
          <NumericString value={totalValue} variant="integer" />
        )}
      </ElementalStyledText>
    </Typography>
  );
}
