import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect } from 'react';

import { GridBreak } from '../../components/GridBreak/GridBreak';
import { initializeOCRWorker } from '../../stores/ocr-temp-gear';
import { AttackPercentBuffs } from './AttackPercentBuffs';
import { CritDamageBuffs } from './CritDamageBuffs';
import { CritRateBuffs } from './CritRateBuffs';
import { ElementalDamageBuffs } from './ElementalDamageBuffs';
import { GearComparerGear } from './GearComparerGear';
import { GearComparerOptions } from './GearComparerOptions';
import { GearValue } from './GearValue';
import { UserBaseStats } from './UserBaseStats';

export function GearComparer() {
  useEffect(() => {
    initializeOCRWorker();
  }, []);

  return (
    <>
      <Grid container spacing={3} mb={3}>
        <Grid xs={12} md={6}>
          <Typography variant="h5" mb={1}>
            Current gear
          </Typography>
          <GearComparerGear position="GearA" />
        </Grid>
        <Grid xs={12} md={6}>
          <Typography variant="h5" mb={1}>
            New gear
          </Typography>
          <GearComparerGear position="GearB" />
        </Grid>

        <GridBreak />

        <Grid xs={12} md={6}>
          <GearValue position="GearA" />
        </Grid>
        <Grid xs={12} md={6}>
          <GearValue position="GearB" />
        </Grid>
      </Grid>

      <Box mb={3}>
        <GearComparerOptions />
      </Box>

      <Box mb={5}>
        <UserBaseStats />
      </Box>

      <Box mb={5}>
        <AttackPercentBuffs />
      </Box>

      <Box mb={5}>
        <ElementalDamageBuffs />
      </Box>

      <Box mb={5}>
        <CritRateBuffs />
      </Box>

      <Box>
        <CritDamageBuffs />
      </Box>
    </>
  );
}
