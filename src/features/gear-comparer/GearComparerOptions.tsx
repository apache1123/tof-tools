import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { CoreElementalTypeSelector } from '../../components/CoreElementalTypeSelector/CoreElementalTypeSelector';
import { ElementalStyledText } from '../../components/ElementalStyledText/ElementalStyledText';
import { useAutoHideSnackbar } from '../../components/Snackbar/useAutoHideSnackbar';
import { gearComparerOptionsState } from './states/gear-comparer-options';

export function GearComparerOptions() {
  const { selectedElementalType } = useSnapshot(gearComparerOptionsState);

  const { SnackbarComponent, showSnackbar } = useAutoHideSnackbar();

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={4}>
          <CoreElementalTypeSelector
            elementalType={selectedElementalType}
            onElementalTypeChange={(elementalType) => {
              gearComparerOptionsState.selectedElementalType = elementalType;

              showSnackbar(
                <Typography variant="subtitle2">
                  Using previously entered
                  <ElementalStyledText elementalType={elementalType}>
                    {` ${elementalType} `}
                  </ElementalStyledText>
                  values & weapons
                </Typography>,
                { severity: 'info' }
              );
            }}
            label="Elemental type to compare"
            required
            variant="filled"
          />
        </Grid>
      </Grid>
      <SnackbarComponent />
    </>
  );
}
