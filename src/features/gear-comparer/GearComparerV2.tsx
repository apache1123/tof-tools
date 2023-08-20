import { Box, Link, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect } from 'react';

import { GridBreak } from '../../components/GridBreak/GridBreak';
import { initializeOCRWorker } from '../../states/ocr-temp-gear';
import { AttackPercentBuffs } from './AttackPercentBuffs';
import { BuffSummary } from './BuffSummary';
import { CritDamageBuffs } from './CritDamageBuffs';
import { CritRateBuffs } from './CritRateBuffs';
import { ElementalDamageBuffs } from './ElementalDamageBuffs';
import { GearComparerGear } from './GearComparerGear';
import { GearComparerGearSwap } from './GearComparerGearSwap';
import { GearComparerOptions } from './GearComparerOptions';
import { GearValue } from './GearValue';
import { Team } from './Team';
import { UserBaseStats } from './UserBaseStats';

export function GearComparerV2() {
  useEffect(() => {
    initializeOCRWorker();
  }, []);

  return (
    <>
      <Box>
        <GearComparerOptions />
      </Box>

      <Box mt={5}>
        <Team />
      </Box>

      <Grid container spacing={3} mb={3}>
        <Grid xs={12} md={6}>
          <Typography variant="h5" mb={1}>
            Current gear
          </Typography>
          <GearComparerGear position="GearA" />
        </Grid>
        <Grid xs={12} md={6}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5" mb={1}>
              New gear
            </Typography>
            <GearComparerGearSwap />
          </Box>
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

      <BuffSummary />

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

      <Box mt={10} textAlign="center">
        <Typography variant="body2">
          This calculator is based off of <strong>Maygi&apos;s</strong>{' '}
          <Link
            href="https://docs.google.com/spreadsheets/d/1ZrJokNh_0AF_9welc7Etz6K8jlpzi5bXpiWz-mQZa78/edit#gid=1875148939"
            target="_blank"
            rel="noopener"
          >
            {' '}
            Gear Comparison calculator.
          </Link>{' '}
          Go check it out! 😊
        </Typography>
      </Box>
    </>
  );
}
