import { Button, ButtonGroup, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import pluralize from 'pluralize';
import { useSnapshot } from 'valtio';

import type { RandomStat } from '../../models/random-stat';
import {
  addOneAverageRoll,
  addOneMaxRoll,
  getType,
  getValueToString,
} from '../../models/random-stat';

export interface GearRollSimulatorStatProps {
  stat: RandomStat;
  rolls: number;
  canRoll: boolean;
  onAddRoll(): void;
}

export function GearRollSimulatorStat({
  stat,
  rolls,
  canRoll,
  onAddRoll,
}: GearRollSimulatorStatProps) {
  const statSnap = useSnapshot(stat);
  const { displayName } = getType(statSnap);

  return (
    <Grid container display="flex" alignItems="center">
      <Grid xs={12}>
        <Typography fontWeight="bold">{displayName}:</Typography>
      </Grid>
      <Grid xs={4}>
        <Stack direction="row" spacing={2}>
          <Typography>{getValueToString(statSnap)}</Typography>
          <Typography fontStyle="italic">
            ({pluralize('roll', rolls, true)})
          </Typography>
        </Stack>
      </Grid>
      <Grid xs={8}>
        <ButtonGroup size="small" disabled={!canRoll}>
          <Button
            onClick={() => {
              addOneAverageRoll(stat);
              onAddRoll();
            }}
          >
            + 1 avg. roll
          </Button>
          <Button
            onClick={() => {
              addOneMaxRoll(stat);
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
