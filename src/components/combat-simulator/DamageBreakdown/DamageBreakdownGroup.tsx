import { Box, Stack, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";

import type { WeaponElementalType } from "../../../definitions/elemental-type";
import { NumericString } from "../../common/NumericString/NumericString";
import { ElementalStyledText } from "../../elemental/ElementalStyledText/ElementalStyledText";

export interface DamageBreakdownGroupProps extends PropsWithChildren {
  title: string;
  element: WeaponElementalType;
  totalValue: number;
  isPercentageValue: boolean;
}

export function DamageBreakdownGroup({
  title,
  element,
  totalValue,
  isPercentageValue,
  children,
}: DamageBreakdownGroupProps) {
  return (
    <Box>
      <Typography fontWeight="bold" sx={{ mb: 2 }}>
        {title}
        {" : "}
        <ElementalStyledText elementalType={element}>
          {isPercentageValue ? (
            <NumericString value={totalValue} variant="percentage2dp" />
          ) : (
            <NumericString value={totalValue} variant="integer" />
          )}
        </ElementalStyledText>
      </Typography>

      <Stack>{children}</Stack>
    </Box>
  );
}
