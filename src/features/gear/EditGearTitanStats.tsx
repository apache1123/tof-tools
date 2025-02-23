import { Box, Typography } from "@mui/material";
import { useSnapshot } from "valtio/index";

import { SectionSubheading } from "../../components/common/SectionHeading/SectionSubheading";
import type { Gear } from "../../models/gear/gear";

export interface EditGearTitanStatsProps {
  gearProxy: Gear;
}

export function EditGearTitanStats({ gearProxy }: EditGearTitanStatsProps) {
  const gear = useSnapshot(gearProxy);
  const { rarity } = gear;

  return (
    rarity === "Titan" && (
      <Box>
        <SectionSubheading>Titan rare stat</SectionSubheading>
        <Typography
          variant="body2"
          sx={{
            fontStyle: "italic",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Will be added later...
        </Typography>
      </Box>
    )
  );
}
