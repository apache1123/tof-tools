import { Stack } from "@mui/material";
import { useSnapshot } from "valtio";

import { maxNumOfRandomStats } from "../../definitions/gear";
import type { Gear } from "../../models/gear/gear";
import { RandomStat } from "../../models/gear/random-stat";
import { EmptyStatEditor, StatEditor } from "../stat/StatEditor";

export interface EditGearRandomStatsProps {
  gearProxy: Gear;
  initialFixedTotalValue?: boolean;
}

export function EditGearRandomStats({
  gearProxy,
  initialFixedTotalValue,
}: EditGearRandomStatsProps) {
  const gear = useSnapshot(gearProxy) as Gear;
  const { isAugmented } = gear;

  const possibleStatTypes = gear.getPossibleRandomStats();

  const rolledStats = gear.getRolledRandomStats();
  const highestRolledStat = gear.getHighestRolledRandomStat();

  return (
    <Stack sx={{ gap: 0.5, mb: -2 }}>
      {[...Array(maxNumOfRandomStats)].map((_, i) => {
        const randomStatProxy = gearProxy.getRandomStat(i);
        const randomStat = gear.getRandomStat(i);

        const isRolled = randomStat ? rolledStats.includes(randomStat) : false;
        const isHighestRolled = randomStat === highestRolledStat;

        return randomStatProxy && randomStat ? (
          <StatEditor
            key={i}
            statProxy={randomStatProxy}
            possibleStatTypes={possibleStatTypes}
            isAugmented={isAugmented}
            isRolled={isRolled}
            isHighestRolled={isHighestRolled}
            initialFixedTotalValue={initialFixedTotalValue}
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
  );
}
