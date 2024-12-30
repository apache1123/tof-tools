import { Stack } from "@mui/material";
import { useSnapshot } from "valtio";

import { GearStars } from "../../components/gear/GearStars/GearStars";
import { GearTypeIcon } from "../../components/gear/GearTypeIcon/GearTypeIcon";
import { defaultNumOfRandomStats } from "../../definitions/gear";
import { statTypesLookup } from "../../definitions/stat-types";
import type { Gear } from "../../models/gear/gear";
import { RandomStat } from "../../models/gear/random-stat";
import { EmptyStatEditor, StatEditor } from "../stat/StatEditor";

export interface GearEditorProps {
  gearProxy: Gear;
}

const possibleStatTypes = statTypesLookup.allIds.map(
  (statTypeId) => statTypesLookup.byId[statTypeId],
);

export function GearEditor({ gearProxy }: GearEditorProps) {
  const gear = useSnapshot(gearProxy) as Gear;
  const { type, isAugmented } = gear;

  return (
    <Stack gap={2}>
      <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
        <GearTypeIcon id={type.id} isTitan={isAugmented} />
        <GearStars
          gear={gear}
          onStarsChange={(stars) => {
            gearProxy.stars = stars;
          }}
        />
      </Stack>
      <Stack gap={1}>
        {[...Array(defaultNumOfRandomStats)].map((_, i) => {
          const randomStat = gearProxy.getRandomStat(i);

          return randomStat ? (
            <StatEditor
              key={i}
              statProxy={randomStat}
              possibleStatTypes={possibleStatTypes}
              isAugmented={isAugmented}
            />
          ) : (
            <EmptyStatEditor
              key={i}
              possibleStatTypes={possibleStatTypes}
              onStatTypeChange={(statType) => {
                gearProxy.setRandomStat(i, new RandomStat(statType));
              }}
              isAugmented={isAugmented}
            />
          );
        })}
      </Stack>
    </Stack>
  );
}
