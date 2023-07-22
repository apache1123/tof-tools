import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { CoreElementalTypeSelector } from '../../../components/CoreElementalTypeSelector/CoreElementalTypeSelector';
import { ElementalStyledText } from '../../../components/ElementalStyledText/ElementalStyledText';
import { useAutoHideSnackbar } from '../../../components/Snackbar/useAutoHideSnackbar';
import {
  gearComparerOptionsStore,
  setSelectedElementalType,
} from '../stores/gear-comparer-options';

export function GearComparerOptionsContainer() {
  const { selectedElementalType } = useSnapshot(gearComparerOptionsStore);

  const { SnackbarComponent, showSnackbar } = useAutoHideSnackbar({
    severity: 'info',
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={4}>
          <CoreElementalTypeSelector
            elementalType={selectedElementalType}
            onElementalTypeChange={(elementalType) => {
              setSelectedElementalType(elementalType);
              showSnackbar(
                <Typography variant="subtitle2">
                  Using previously entered
                  <ElementalStyledText
                    elementalType={elementalType}
                    variant="subtitle2"
                  >
                    {` ${elementalType} `}
                  </ElementalStyledText>
                  values
                </Typography>
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
