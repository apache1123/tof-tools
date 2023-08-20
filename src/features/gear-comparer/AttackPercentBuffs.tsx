import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { PercentageNumericInput } from '../../components/NumericInput/PercentageNumericInput';
import {
  selectedElementalUserStatsState,
  setMiscAttackPercent,
} from './states/derived/selected-elemental-user-stats';
import { gearComparerOptionsState } from './states/gear-comparer-options';

export function AttackPercentBuffs() {
  const { selectedElementalType } = useSnapshot(gearComparerOptionsState);
  const { selectedElementalUserStats } = useSnapshot(
    selectedElementalUserStatsState
  );

  if (!selectedElementalType || !selectedElementalUserStats) {
    return null;
  }

  const { miscAttackPercent } = selectedElementalUserStats;

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        {selectedElementalType ? `${selectedElementalType} attack` : 'Attack'} %
        buffs
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        This section is only needed if you&apos;re comparing gear with attack %
        stats and want to be accurate, otherwise don&apos;t bother
      </Typography>

      <Grid container spacing={2} mt={2}>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <PercentageNumericInput
            id="misc-atk-percent"
            label="Misc. attack % buffs"
            variant="filled"
            value={miscAttackPercent}
            onChange={setMiscAttackPercent}
          />
        </Grid>
      </Grid>
    </>
  );
}
