import { Box, Stack } from "@mui/material";

import { LoadoutSelector } from "../loadouts/LoadoutSelector";
import { LoadoutStats } from "../loadouts/LoadoutStats";
import { LoadoutTeam } from "../loadouts/LoadoutTeam";

export function DamageSimulator() {
  return (
    <Box>
      <Stack spacing={5}>
        <LoadoutSelector />
        <LoadoutTeam />
        <LoadoutStats />
      </Stack>
    </Box>
  );
}
