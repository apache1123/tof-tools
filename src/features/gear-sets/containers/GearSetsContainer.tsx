import { Box, Paper, Stack } from '@mui/material';
import { useEffect } from 'react';

import { initializeOCRWorker } from '../../../stores/ocr-temp-gear';
import { CurrentGearSetGears } from '../CurrentGearSetGears';
import { CurrentGearSetName } from '../CurrentGearSetName';
import { DeleteCurrentGearSet } from '../DeleteCurrentGearSet';
import { GearSetTabs } from '../GearSetTabs';

export function GearSetsContainer() {
  useEffect(() => {
    initializeOCRWorker();
  }, []);

  return (
    <>
      <GearSetTabs />
      <Paper elevation={0} square sx={{ mt: 0.5, p: 3 }}>
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <CurrentGearSetName />
          <Box>
            <DeleteCurrentGearSet />
          </Box>
        </Stack>

        <CurrentGearSetGears />
      </Paper>
    </>
  );
}
