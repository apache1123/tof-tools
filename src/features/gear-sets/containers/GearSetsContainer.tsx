import { Box, Paper } from '@mui/material';

import { CurrentGearSetGears } from '../CurrentGearSetGears';
import { CurrentGearSetName } from '../CurrentGearSetName';
import { GearSetTabs } from '../GearSetTabs';

export function GearSetsContainer() {
  return (
    <>
      <GearSetTabs />
      <Paper elevation={0} square sx={{ mt: 0.5, p: 3 }}>
        <Box mb={3}>
          <CurrentGearSetName />
        </Box>
        <CurrentGearSetGears />
      </Paper>
    </>
  );
}
