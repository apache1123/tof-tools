import { Box, Paper, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useProxy } from "valtio/utils";

import { Button } from "../../components/common/Button/Button";
import { ErrorText } from "../../components/common/ErrorText/ErrorText";
import { SectionHeading } from "../../components/common/SectionHeading/SectionHeading";
import { SectionSubheading } from "../../components/common/SectionHeading/SectionSubheading";
import type { CoreElementalType } from "../../definitions/elemental-type";
import type { CharacterId } from "../../models/character/character-data";
import type { Gear } from "../../models/gear/gear";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";
import { GearCompareGear } from "./GearCompareGear";
import { SelectGearType } from "./SelectGearType";
import { SelectNewGear } from "./SelectNewGear";

export interface GearSectionProps {
  characterId: CharacterId;
  currentGear: Gear | undefined;
  currentGearProxy: Gear | undefined;
  newGear: Gear | undefined;
  newGearProxy: Gear | undefined;
  prioritizedElement: CoreElementalType | undefined;
}

export function GearSection({
  characterId,
  currentGear,
  currentGearProxy,
  newGear,
  newGearProxy,
  prioritizedElement,
}: GearSectionProps) {
  const $state = useProxy(gearCompareState);
  const { gearTypeId } = $state;

  return (
    <Paper sx={{ p: 3 }}>
      <SectionHeading>Select gear to compare</SectionHeading>

      <Stack sx={{ gap: 3 }}>
        <SelectGearType />

        {gearTypeId && (
          <Grid container spacing={2}>
            <Grid xs={12} md={6}>
              <Box sx={{ height: 40 }}>
                <SectionSubheading>Current gear in preset</SectionSubheading>
              </Box>

              {currentGear && currentGearProxy ? (
                <GearCompareGear
                  gearProxy={currentGearProxy}
                  prioritizedElement={prioritizedElement}
                />
              ) : (
                <ErrorText>No gear in preset</ErrorText>
              )}
            </Grid>

            <Grid xs={12} md={6}>
              <Stack
                direction="row"
                sx={{ height: 40, gap: 1, alignItems: "start" }}
              >
                <SectionSubheading>New gear to compare</SectionSubheading>
                {newGear && newGearProxy && (
                  <Button
                    buttonProps={{ size: "small" }}
                    onClick={() => {
                      $state.newGearId = undefined;
                    }}
                  >
                    Clear
                  </Button>
                )}
              </Stack>

              {newGear && newGearProxy ? (
                <GearCompareGear
                  gearProxy={newGearProxy}
                  prioritizedElement={prioritizedElement}
                />
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
