import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { PercentageNumericInput } from '../../../components/NumericInput/PercentageNumericInput';
import {
  setOtherGearElementalDamage,
  userStatsStore,
} from '../stores/user-stats';

export function ElementalDamageContainer() {
  const { elementalType, otherGearElementalDamage } =
    useSnapshot(userStatsStore);
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        {elementalType ? `${elementalType} damage` : 'Damage'} %
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        This section is needed if you&apos;re comparing gear with dmg % related
        stats and want to be accurate, otherwise don&apos;t bother
      </Typography>

      <Grid container spacing={2} mb={2}>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <PercentageNumericInput
            id="other-gear-elemental-damage"
            label={
              'Damage %' +
              (elementalType ? ` (${elementalType})` : '') +
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
