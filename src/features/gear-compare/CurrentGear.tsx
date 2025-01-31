import { Alert, Card, Typography } from "@mui/material";

import { gearCompareState } from "../../states/gear-compare/gear-compare-state";
import { EditGearInline } from "../gear/EditGearInline";

export function CurrentGear() {
  const gearProxy = gearCompareState.getCurrentGear();

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Current gear in preset
      </Typography>

      {gearProxy ? (
        <Card elevation={1} sx={{ p: 2 }}>
          <EditGearInline gearProxy={gearProxy} />
        </Card>
      ) : (
        <Alert severity="info">No gear in preset</Alert>
      )}
    </>
  );
}
