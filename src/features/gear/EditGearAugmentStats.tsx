import { Stack } from "@mui/material";
import { useSnapshot } from "valtio";

import { maxNumOfAugmentStats } from "../../definitions/gear";
import { AugmentStat } from "../../models/gear/augment-stat";
import type { Gear } from "../../models/gear/gear";
import { EmptyStatEditor, StatEditor } from "../stat/StatEditor";

export interface EditGearAugmentStatsProps {
  gearProxy: Gear;
}

export function EditGearAugmentStats({ gearProxy }: EditGearAugmentStatsProps) {
  const gear = useSnapshot(gearProxy);

  const possibleAugmentStatsForEdit = gear.getPossibleAugmentStats();
  const mappedPossibleAugmentStatsForEdit = possibleAugmentStatsForEdit
    ? possibleAugmentStatsForEdit.priority
        .map((possibleStat) => possibleStat.type)
        .concat(
          possibleAugmentStatsForEdit.fallback.map(
            (possibleStat) => possibleStat.type,
          ),
        )
    : [];

  return (
    <Stack sx={{ gap: 2 }}>
      {[...Array(maxNumOfAugmentStats)].map((_, i) => {
        const augmentStatProxy = gearProxy.getAugmentStat(i);
        const augmentStat = gear.getAugmentStat(i);

        return augmentStatProxy && augmentStat ? (
          <StatEditor
            key={i}
            statProxy={augmentStatProxy}
            possibleStatTypes={mappedPossibleAugmentStatsForEdit}
            isAugmented={true}
            showTotalValueOnly
          />
        ) : (
          <EmptyStatEditor
            key={i}
            possibleStatTypes={mappedPossibleAugmentStatsForEdit}
            onStatTypeChange={(statType) => {
              gearProxy.setAugmentStat(i, new AugmentStat(statType));
            }}
            isAugmented={true}
            showTotalValueOnly
          />
        );
      })}
    </Stack>
  );
}
