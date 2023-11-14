import { Box, Paper, Stack } from '@mui/material';

import { DeleteLoadout } from './DeleteLoadout';
import { LoadoutElementalType } from './LoadoutElementalType';
import { LoadoutGearSet } from './LoadoutGearSet';
import { LoadoutGearSetStatSummary } from './LoadoutGearSetStatSummary';
import { LoadoutName } from './LoadoutName';
import { LoadoutStats } from './LoadoutStats';
import { LoadoutTabs } from './LoadoutTabs';
import { LoadoutTeam } from './LoadoutTeam';

export function Loadouts() {
  return (
    <>
      <LoadoutTabs />
      <Paper elevation={0} square sx={{ mt: 0.5, p: 3 }}>
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" mb={3}>
            <Box display="flex">
              <LoadoutName />
              <Box width={160} ml={3}>
                <LoadoutElementalType />
              </Box>
            </Box>
            <Box>
              <DeleteLoadout />
            </Box>
          </Stack>

          <LoadoutTeam />
          <LoadoutStats />
          <LoadoutGearSet />
          <LoadoutGearSetStatSummary />
        </Stack>
      </Paper>
    </>
  );
}
