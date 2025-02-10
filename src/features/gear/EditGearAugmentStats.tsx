import { Box } from "@mui/material";
import { useSnapshot } from "valtio";

import { SectionSubheading } from "../../components/common/SectionHeading/SectionSubheading";
import type { Gear } from "../../models/gear/gear";
import { PossibleAugmentStats } from "./PossibleAugmentStats";

export interface EditGearAugmentStatsProps {
  gearProxy: Gear;
}

export function EditGearAugmentStats({ gearProxy }: EditGearAugmentStatsProps) {
  const gear = useSnapshot(gearProxy);

  const possibleAugmentStats = gear.getPossibleAugmentStats();

  return (
    <Box>
      <SectionSubheading>Augmentation Stats</SectionSubheading>

      {possibleAugmentStats && (
        <PossibleAugmentStats possibleAugmentStats={possibleAugmentStats} />
      )}
    </Box>
  );
}
