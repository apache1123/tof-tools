import { Box, Stack } from "@mui/material";
import { useSnapshot } from "valtio";

import { defaultNumOfRandomStats } from "../../../definitions/gear";
import { statTypesLookup } from "../../../definitions/stat-types";
import type { Gear } from "../../../models/gear/gear";
import { RandomStat } from "../../../models/random-stat";
import { GearStars } from "../../presentational/GearStars/GearStars";
import { GearTypeIcon } from "../../presentational/GearTypeIcon/GearTypeIcon";
import { EmptyStatEditor, StatEditor } from "../StatEditor/StatEditor";

export interface GearEditorProps {
  gearState: Gear;
}

const possibleStatTypes = statTypesLookup.allIds.map(
  (statTypeId) => statTypesLookup.byId[statTypeId],
);

export function GearEditor({ gearState }: GearEditorProps) {
  const gearSnap = useSnapshot(gearState) as Gear;
  const { type, isAugmented } = gearSnap;

  return (
    <Box>
      <Stack gap={2}>
        <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
          <GearTypeIcon gearName={type.id} isTitan={isAugmented} />
          <GearStars
            gear={gearSnap}
            onStarsChange={(stars) => {
              gearState.stars = stars;
            }}
          />
        </Stack>
        <Stack gap={1}>
          {[...Array(defaultNumOfRandomStats)].map((_, i) => {
            const randomStat = gearState.randomStats[i];

            return randomStat ? (
              <StatEditor
                key={i}
                statState={randomStat}
                possibleStatTypes={possibleStatTypes}
                isAugmented={isAugmented}
              />
            ) : (
              <EmptyStatEditor
                key={i}
                possibleStatTypes={possibleStatTypes}
                onStatTypeChange={(statType) => {
                  gearState.randomStats[i] = new RandomStat(statType);
                }}
                isAugmented={isAugmented}
              />
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
}
