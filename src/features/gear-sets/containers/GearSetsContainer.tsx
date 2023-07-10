import { Paper } from '@mui/material';

import { CurrentGearSetGears } from '../CurrentGearSetGears';
import { GearSetTabs } from '../GearSetTabs';

export function GearSetsContainer() {
  return (
    <>
      <GearSetTabs />
      <Paper elevation={0} square sx={{ mt: 1, p: 3 }}>
        <CurrentGearSetGears />
      </Paper>
    </>
  );
}
