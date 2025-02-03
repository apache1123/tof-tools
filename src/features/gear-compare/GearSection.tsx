import { Alert, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useProxy } from "valtio/utils";

import { Button } from "../../components/common/Button/Button";
import type { CharacterId } from "../../models/character/character-data";
import type { Gear } from "../../models/gear/gear";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";
import { CurrentGear } from "./CurrentGear";
import { NewGear } from "./NewGear";
import { SelectGearType } from "./SelectGearType";
import { SelectNewGear } from "./SelectNewGear";

export interface GearSectionProps {
  characterId: CharacterId;
  currentGearProxy: Gear;
  newGearProxy: Gear;
}

export function GearSection({
  characterId,
  currentGearProxy,
  newGearProxy,
}: GearSectionProps) {
  const $state = useProxy(gearCompareState);
  const { gearTypeId } = $state;

  return (
    <Paper sx={{ p: 3 }}>
      <Stack sx={{ gap: 3 }}>
        <SelectGearType />

        {gearTypeId && (
          <Grid container spacing={2}>
            <Grid xs={12} md={6}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Current gear in preset
              </Typography>

              {currentGearProxy ? (
                <CurrentGear gearProxy={currentGearProxy} />
              ) : (
                <Alert severity="info">No gear in preset</Alert>
              )}
            </Grid>

            <Grid xs={12} md={6}>
              <Stack
                direction="row"
                sx={{ mb: 2, gap: 1, alignItems: "center" }}
              >
                <Typography variant="h5">New gear to compare</Typography>
                {newGearProxy && (
                  <Button
                    onClick={() => {
                      $state.newGearId = undefined;
                    }}
                  >
                    Clear
                  </Button>
                )}
              </Stack>

              {newGearProxy ? (
                <NewGear gearProxy={newGearProxy} />
              ) : (
                <SelectNewGear characterId={characterId} />
              )}
            </Grid>
          </Grid>
        )}
      </Stack>
    </Paper>
  );
}
