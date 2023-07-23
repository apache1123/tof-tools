import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { PercentageNumericInput } from '../../components/NumericInput/PercentageNumericInput';
import {
  selectedElementalUserStatsStore,
  setOtherGearElementalDamage,
} from './stores/derived/selected-elemental-user-stats';
import { gearComparerOptionsStore } from './stores/gear-comparer-options';

export function ElementalDamageBuffs() {
  const { selectedElementalType } = useSnapshot(gearComparerOptionsStore);
  const { selectedElementalUserStats } = useSnapshot(
    selectedElementalUserStatsStore
  );

  if (!selectedElementalType || !selectedElementalUserStats) {
    return null;
  }

  const { otherGearElementalDamage } = selectedElementalUserStats;

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        {selectedElementalType ? `${selectedElementalType} damage` : 'Damage'} %
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        This section is only needed if you&apos;re comparing gear with dmg %
        related stats and want to be accurate, otherwise don&apos;t bother
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <PercentageNumericInput
            id="other-gear-elemental-damage"
            label={
              'Damage %' +
              (selectedElementalType ? ` (${selectedElementalType})` : '') +
              ' from all other gear pieces'
            }
            variant="filled"
            value={otherGearElementalDamage}
            onChange={setOtherGearElementalDamage}
            helperText="Add up values from all other gear pieces"
          />
        </Grid>
      </Grid>
    </>
  );
}
