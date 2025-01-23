import { Stack } from "@mui/material";
import { useSnapshot } from "valtio";

import { GearRarityToggle } from "../../components/gear/GearRarityToggle/GearRarityToggle";
import { GearStars } from "../../components/gear/GearStars/GearStars";
import { GearTypeIcon } from "../../components/gear/GearTypeIcon/GearTypeIcon";
import { defaultNumOfRandomStats } from "../../definitions/gear";
import { statTypesLookup } from "../../definitions/stat-types";
import type { Gear } from "../../models/gear/gear";
import { RandomStat } from "../../models/gear/random-stat";
import { EmptyStatEditor, StatEditor } from "../stat/StatEditor";

export interface EditGearProps {
  gearProxy: Gear;
}

const possibleStatTypes = statTypesLookup.allIds.map(
  (statTypeId) => statTypesLookup.byId[statTypeId],
);

export function EditGear({ gearProxy }: EditGearProps) {
  const gear = useSnapshot(gearProxy) as Gear;
  const { type, rarity } = gear;

  return (
    <Stack gap={3}>
      <Stack direction="row" gap={1} sx={{ alignItems: "start" }}>
        <GearTypeIcon id={type.id} rarity={rarity} />

        <Stack sx={{ gap: 1 }}>
          <GearRarityToggle
            value={rarity}
            onChange={(value) => {
              gearProxy.rarity = value;
            }}
          />
          <GearStars
            gear={gear}
            onStarsChange={(stars) => {
              gearProxy.stars = stars;
            }}
          />
        </Stack>
      </Stack>
      <Stack gap={2}>
        {[...Array(defaultNumOfRandomStats)].map((_, i) => {
          const randomStat = gearProxy.getRandomStat(i);

          return randomStat ? (
            <StatEditor
              key={i}
              statProxy={randomStat}
              possibleStatTypes={possibleStatTypes}
              isAugmented={rarity === "Augmented" || rarity === "Titan"}
            />
          ) : (
            <EmptyStatEditor
              key={i}
              possibleStatTypes={possibleStatTypes}
              onStatTypeChange={(statType) => {
                gearProxy.setRandomStat(i, new RandomStat(statType));
              }}
              isAugmented={rarity === "Augmented" || rarity === "Titan"}
            />
          );
        })}
      </Stack>
    </Stack>
  );
}
