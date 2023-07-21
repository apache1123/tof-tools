import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect } from 'react';

import { GridBreak } from '../../../components/GridBreak/GridBreak';
import { initializeOCRWorker } from '../../../stores/ocr-temp-gear';
import { AttackPercentContainer } from './AttackPercentContainer';
import { CritDamageContainer } from './CritDamageContainer';
import { CritRateContainer } from './CritRateContainer';
import { ElementalDamageContainer } from './ElementalDamageContainer';
import { GearComparerGearContainer } from './GearComparerGearContainer';
import { GearComparerOptionsContainer } from './GearComparerOptionsContainer';
import { GearValueContainer } from './GearValueContainer';
import { UserBaseStatContainer } from './UserBaseStatsContainer';

export function GearComparerContainer() {
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
          <GearComparerGearContainer position="GearA" />
        </Grid>
        <Grid xs={12} md={6}>
          <Typography variant="h5" mb={1}>
            New gear
          </Typography>
          <GearComparerGearContainer position="GearB" />
        </Grid>

        <GridBreak />

        <Grid xs={12} md={6}>
          <GearValueContainer position="GearA" />
        </Grid>
        <Grid xs={12} md={6}>
          <GearValueContainer position="GearB" />
        </Grid>
      </Grid>

      <Box mb={3}>
        <GearComparerOptionsContainer />
      </Box>

      <Box mb={5}>
        <UserBaseStatContainer />
      </Box>

      <Box mb={5}>
        <AttackPercentContainer />
      </Box>

      <Box mb={5}>
        <ElementalDamageContainer />
      </Box>

      <Box mb={5}>
        <CritRateContainer />
      </Box>

      <Box>
        <CritDamageContainer />
      </Box>
    </>
  );
}
