import { Box, Divider, Link, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { BuffSummary } from './BuffSummary';
import { GearComparerOptions } from './GearComparerOptions';
import { LoadoutGear } from './LoadoutGear';
import { LoadoutGearValue } from './LoadoutGearValue';
import { LoadoutStats } from './LoadoutStats';
import { LoadoutTeam } from './LoadoutTeam';
import { LoadoutTitle } from './LoadoutTitle';
import { ReplacementGear } from './ReplacementGear';
import { ReplacementGearValue } from './ReplacementGearValue';

export function GearComparer() {
  return (
    <>
      <Box mb={3}>
        <GearComparerOptions />
      </Box>

      <Paper sx={{ p: 2, pb: 4 }} square elevation={0}>
        <Stack spacing={4}>
          <LoadoutTitle />
          <LoadoutTeam />
          <LoadoutStats />
        </Stack>
      </Paper>

      <Grid container spacing={0}>
        <Grid xs={12} md={6}>
          <Paper sx={{ p: 2 }} square elevation={0}>
            <Typography variant="h5" mb={1}>
              Current gear
            </Typography>
            <LoadoutGear />
            <LoadoutGearValue />
          </Paper>
        </Grid>
        <Grid xs={12} md={6} py={2} pl={3}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5" mb={1}>
              New gear
            </Typography>
          </Box>
          <ReplacementGear />
          <ReplacementGearValue />
        </Grid>
      </Grid>

      <Divider sx={{ my: 5 }} />

      <BuffSummary />

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
