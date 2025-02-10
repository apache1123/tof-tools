import { Box, Stack } from "@mui/material";
import { useSnapshot } from "valtio";

import { SectionSubheading } from "../../components/common/SectionHeading/SectionSubheading";
import { maxNumOfRandomStats } from "../../definitions/gear";
import type { Gear } from "../../models/gear/gear";
import { RandomStat } from "../../models/gear/random-stat";
import { EmptyStatEditor, StatEditor } from "../stat/StatEditor";

export interface EditGearRandomStatsProps {
  gearProxy: Gear;
}

export function EditGearRandomStats({ gearProxy }: EditGearRandomStatsProps) {
  const gear = useSnapshot(gearProxy) as Gear;
  const { rarity } = gear;

  const possibleStatTypes = gear.getPossibleRandomStats();

  const rolledStats = gear.getRolledRandomStats();
  const highestRolledStat = gear.getHighestRolledRandomStat();

  return (
    <Box>
      <SectionSubheading>Random Stats</SectionSubheading>

      <Stack gap={2}>
        {[...Array(maxNumOfRandomStats)].map((_, i) => {
          const randomStatProxy = gearProxy.getRandomStat(i);
          const randomStat = gear.getRandomStat(i);

          const isRolled = randomStat
            ? rolledStats.includes(randomStat)
            : false;
          const isHighestRolled = randomStat === highestRolledStat;

          return randomStatProxy && randomStat ? (
            <StatEditor
              key={i}
              statProxy={randomStatProxy}
              possibleStatTypes={possibleStatTypes}
              isAugmented={rarity === "Augmented" || rarity === "Titan"}
              isRolled={isRolled}
              isHighestRolled={isHighestRolled}
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
    </Box>
  );
}
