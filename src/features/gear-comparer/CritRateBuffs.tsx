import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { PercentageNumericInput } from '../../components/NumericInput/PercentageNumericInput';
import {
  selectedElementalUserStatsState,
  setMiscCritRate,
} from './states/derived/selected-elemental-user-stats';

export function CritRateBuffs() {
  const { selectedElementalUserStats } = useSnapshot(
    selectedElementalUserStatsState
  );

  if (!selectedElementalUserStats) {
    return null;
  }

  const { miscCritRate } = selectedElementalUserStats;

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Crit rate % buffs
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        This section is only needed if you&apos;re comparing gear with crit
        related stats and want to be accurate, otherwise don&apos;t bother
      </Typography>

      <Grid container spacing={2} mt={2}>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <PercentageNumericInput
            id="misc-crit-rate"
            label="Misc. crit rate % buffs"
            variant="filled"
            value={miscCritRate}
            onChange={setMiscCritRate}
          />
        </Grid>
      </Grid>
    </>
  );
}
