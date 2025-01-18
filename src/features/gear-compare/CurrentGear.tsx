import { Alert, Card, Typography } from "@mui/material";
import { useProxy } from "valtio/utils";

import type { CharacterPreset } from "../../models/character/character-preset";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";
import { GearEditor } from "../gear/GearEditor";

export interface CurrentGearProps {
  characterPresetProxy: CharacterPreset;
}

export function CurrentGear({ characterPresetProxy }: CurrentGearProps) {
  const $state = useProxy(gearCompareState);
  const { gearTypeId } = $state;

  const gearProxy = gearTypeId
    ? characterPresetProxy?.gearSetPreset?.gearSet?.getSlot(gearTypeId).gear
    : undefined;

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Current gear in preset
      </Typography>

      {gearProxy ? (
        <Card elevation={1} sx={{ p: 2 }}>
          <GearEditor gearProxy={gearProxy} />
        </Card>
      ) : (
        <Alert severity="info">No gear in preset</Alert>
      )}
    </>
  );
}
