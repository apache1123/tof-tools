import { Box, Paper, Stack } from '@mui/material';
import { useEffect } from 'react';

import { initializeOCRWorker } from '../../stores/ocr-temp-gear';
import { CurrentGearSetElementalType } from './CurrentGearSetElementalType';
import { CurrentGearSetGears } from './CurrentGearSetGears';
import { CurrentGearSetName } from './CurrentGearSetName';
import { CurrentGearSetStatSummary } from './CurrentGearSetStatSummary';
import { DeleteCurrentGearSet } from './DeleteCurrentGearSet';
import { GearSetTabs } from './GearSetTabs';

export function GearSets() {
  useEffect(() => {
    initializeOCRWorker();
  }, []);

  return (
    <>
      <GearSetTabs />
      <Paper elevation={0} square sx={{ mt: 0.5, p: 3 }}>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Box display="flex">
            <CurrentGearSetName />
            <Box width={160} ml={3}>
              <CurrentGearSetElementalType />
            </Box>
          </Box>
          <Box>
            <DeleteCurrentGearSet />
          </Box>
        </Stack>

        <Box mb={3}>
          <CurrentGearSetStatSummary />
        </Box>

        <CurrentGearSetGears />
      </Paper>
    </>
  );
}
