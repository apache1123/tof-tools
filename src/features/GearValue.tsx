import { Paper, Typography } from "@mui/material";

import { NumericStringPercentage2dp } from "../components/common/NumericString/NumericString";
import { getComparisonColor } from "../utils/color-utils";

export interface GearValueProps {
  gearValue: number;
  isGearValueHigher?: boolean;
  titanGearValue?: number;
  isTitanGearValueHigher?: boolean;
  ["data-testid"]?: string;
}

export function GearValue({
  gearValue,
  isGearValueHigher,
  titanGearValue,
  isTitanGearValueHigher,
  "data-testid": dataTestId,
}: GearValueProps) {
  return (
    <Paper elevation={2} square sx={{ p: 2, textAlign: "center" }}>
      <Typography>Value: </Typography>
      <Typography
        fontSize="1.5rem"
        sx={{
          color:
            isGearValueHigher !== undefined
              ? getComparisonColor(isGearValueHigher)
              : "inherit",
        }}
        data-testid={dataTestId ? `${dataTestId}-value` : "gear-value"}
      >
        <NumericStringPercentage2dp value={gearValue} />
      </Typography>

      {titanGearValue !== undefined && (
        <>
          <Typography sx={{ mt: 3 }}>Value at max potential titan: </Typography>
          <Typography
            color={
              isTitanGearValueHigher !== undefined
                ? getComparisonColor(isTitanGearValueHigher)
                : "inherit"
            }
            data-testid={
              dataTestId ? `${dataTestId}-max-titan-value` : "max-titan-value"
            }
          >
            <NumericStringPercentage2dp value={titanGearValue} />
          </Typography>
        </>
      )}
    </Paper>
  );
}
