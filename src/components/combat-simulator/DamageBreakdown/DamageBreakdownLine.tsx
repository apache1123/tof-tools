import { Typography } from "@mui/material";

import type { ElementalType } from "../../../definitions/elemental-type";
import { NumericString } from "../../common/NumericString/NumericString";
import { ElementalStyledText } from "../../elemental/ElementalStyledText/ElementalStyledText";

export interface DamageBreakdownLineProps {
  displayName: string;
  element: ElementalType;
  totalValue: number;
  isPercentageValue: boolean;
}

export function DamageBreakdownLine({
  displayName,
  element,
  totalValue,
  isPercentageValue,
}: DamageBreakdownLineProps) {
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
