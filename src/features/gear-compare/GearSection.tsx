import { Card, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useProxy } from "valtio/utils";

import type { CharacterId } from "../../models/character/character-data";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";
import { CurrentGear } from "./CurrentGear";
import { NewGear } from "./NewGear";
import { SelectGearType } from "./SelectGearType";

export interface GearSectionProps {
  characterId: CharacterId;
}

export function GearSection({ characterId }: GearSectionProps) {
  const $state = useProxy(gearCompareState);
  const { gearTypeId } = $state;

  return (
    <Card sx={{ p: 3 }}>
      <Stack sx={{ gap: 3 }}>
        <SelectGearType />

        {gearTypeId && (
          <Grid container spacing={2}>
            <Grid xs={12} md={6}>
              <CurrentGear />
            </Grid>

            <Grid xs={12} md={6}>
              <NewGear characterId={characterId} />
            </Grid>
          </Grid>
        )}
      </Stack>
    </Card>
  );
}
