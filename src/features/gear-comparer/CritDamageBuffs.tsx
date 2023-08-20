import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { PercentageNumericInput } from '../../components/NumericInput/PercentageNumericInput';
import {
  selectedElementalUserStatsState,
  setMiscCritDamage,
} from './states/derived/selected-elemental-user-stats';

export function CritDamageBuffs() {
  const { selectedElementalUserStats } = useSnapshot(
    selectedElementalUserStatsState
  );

  if (!selectedElementalUserStats) {
    return null;
  }

  const { miscCritDamage } = selectedElementalUserStats;

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Crit damage % buffs
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        This section is only needed if you&apos;re comparing gear with crit
        related stats and want to be accurate, otherwise don&apos;t bother
      </Typography>

      <Grid container spacing={2} mt={2}>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <PercentageNumericInput
            id="misc-crit-damage"
            label="Misc. crit damage % buffs"
            variant="filled"
            value={miscCritDamage}
            onChange={setMiscCritDamage}
          />
        </Grid>
      </Grid>
    </>
  );
}
