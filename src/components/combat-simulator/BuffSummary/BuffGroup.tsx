import { Box, Divider, Stack, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";

import type { WeaponElementalType } from "../../../definitions/elemental-type";
import {
  NumericStringInteger,
  NumericStringPercentage2dp,
} from "../../common/NumericString/NumericString";
import { ElementalStyledText } from "../../elemental/ElementalStyledText/ElementalStyledText";

export interface BuffGroupProps extends PropsWithChildren {
  title: string;
  element: WeaponElementalType;
  totalValue: number;
  isPercentageValue: boolean;
}

export function BuffGroup({
  title,
  element,
  totalValue,
  isPercentageValue,
  children,
}: BuffGroupProps) {
  return (
    <Box>
      <Divider sx={{ mb: 1 }}>
        <Typography fontWeight="bold">
          {title}
          {" : "}
          <ElementalStyledText elementalType={element}>
            {isPercentageValue ? (
              <NumericStringPercentage2dp value={totalValue} />
            ) : (
              <NumericStringInteger value={totalValue} />
            )}
          </ElementalStyledText>
        </Typography>
      </Divider>

      <Stack>{children}</Stack>
    </Box>
  );
}
