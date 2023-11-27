import { Paper, Stack } from '@mui/material';

import { LoadoutGearSet } from './LoadoutGearSet';
import { LoadoutGearSetStatSummary } from './LoadoutGearSetStatSummary';
import { LoadoutStats } from './LoadoutStats';
import { LoadoutTabs } from './LoadoutTabs';
import { LoadoutTeam } from './LoadoutTeam';
import { LoadoutTopBar } from './LoadoutTopBar';

export function Loadouts() {
  return (
    <>
      <LoadoutTabs />
      <Paper elevation={0} square sx={{ mt: 0.5, p: 3 }}>
        <Stack spacing={4}>
          <LoadoutTopBar />
          <LoadoutTeam />
          <LoadoutStats />
          <LoadoutGearSet />
          <LoadoutGearSetStatSummary />
        </Stack>
      </Paper>
    </>
  );
}
