import { Button, ButtonGroup, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import pluralize from 'pluralize';
import { useSnapshot } from 'valtio';

import type { RandomStat } from '../../models/random-stat';

export interface GearRollSimulatorStatProps {
  statState: RandomStat;
  rolls: number;
  canRoll: boolean;
  onAddRoll(): void;
}

export function GearRollSimulatorStat({
  statState,
  rolls,
  canRoll,
  onAddRoll,
}: GearRollSimulatorStatProps) {
  const statSnap = useSnapshot(statState);
  const { displayName } = statSnap.type;

  return (
    <Grid container display="flex" alignItems="center">
      <Grid xs={12}>
        <Typography fontWeight="bold">{displayName}:</Typography>
      </Grid>
      <Grid xs={4}>
        <Stack direction="row" spacing={2}>
          <Typography>{statSnap.getValueToString()}</Typography>
          <Typography fontStyle="italic">
            ({pluralize('roll', rolls, true)})
          </Typography>
        </Stack>
      </Grid>
      <Grid xs={8}>
        <ButtonGroup size="small" disabled={!canRoll}>
          <Button
            onClick={() => {
              statState.addOneAverageRoll();
              onAddRoll();
            }}
          >
            + 1 avg. roll
          </Button>
          <Button
            onClick={() => {
              statState.addOneMaxRoll();
              onAddRoll();
            }}
          >
            + 1 max. roll
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
