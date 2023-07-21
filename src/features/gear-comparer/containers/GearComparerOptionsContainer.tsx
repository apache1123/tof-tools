import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { CoreElementalTypeSelector } from '../../../components/CoreElementalTypeSelector/CoreElementalTypeSelector';
import { setElementalType, userStatsStore } from '../stores/user-stats';

export function GearComparerOptionsContainer() {
  const { elementalType } = useSnapshot(userStatsStore);

  return (
    <Grid container spacing={2}>
      <Grid xs={12} sm={6} md={4}>
        <CoreElementalTypeSelector
          elementalType={elementalType}
          onElementalTypeChange={setElementalType}
          label="Elemental type to compare"
          required
          variant="filled"
        />
      </Grid>
    </Grid>
  );
}
