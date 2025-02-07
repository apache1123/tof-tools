import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Box, Link, Paper, Stack, Typography } from "@mui/material";

import type { PropsWithElevation } from "../../components/__helpers__/props-with-elevation";
import { GearCard } from "../../components/gear/GearCard/GearCard";
import type { Gear } from "../../models/gear/gear";

export interface MaxTitanGearPreviewProps extends PropsWithElevation {
  gear: Gear;
}

export function MaxTitanGearPreview({
  gear,
  elevation,
}: MaxTitanGearPreviewProps) {
  const maxTitanGear = gear.getMaxTitanGear();

  return (
    <Box>
      <Typography gutterBottom>
        The maximum possible stats this gear can get at max titan (unlocked
        after 120 augmentations).{" "}
        <Link
          href="https://toweroffantasy.fandom.com/wiki/Equipment#Equipment_Augmentation"
          target="_blank"
          rel="noopener"
        >
          More info
        </Link>
      </Typography>

      <Stack direction="row" sx={{ gap: 2, flexWrap: "wrap" }}>
        <GearCard gear={gear} elevation={elevation} />

        <Paper
          elevation={elevation}
          sx={{
            alignSelf: "center",
            p: 0.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <KeyboardDoubleArrowRightIcon />
        </Paper>

        {maxTitanGear && <GearCard gear={maxTitanGear} elevation={elevation} />}
      </Stack>
    </Box>
  );
}
