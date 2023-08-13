import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Box, Paper, Stack, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import { proxy, useSnapshot } from 'valtio';

import { statTypesLookup } from '../../constants/stat-types';
import type { RandomStat } from '../../models/random-stat';
import {
  getMaxAugmentIncrease,
  getType,
  newRandomStat,
} from '../../models/random-stat';
import type { StatType } from '../../models/stat-type';
import { toPercentageString2dp } from '../../utils/number-utils';
import { EmptyStatEditor, StatEditor } from '../StatEditor';

const possibleStatTypes = statTypesLookup.allIds.map(
  (id) => statTypesLookup.byId[id]
);

const state = proxy<{ stat: RandomStat | undefined }>({ stat: undefined });

export function StatMaxAugmentIncrease() {
  const { stat: statState } = state;
  const { stat: statSnap } = useSnapshot(state);

  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h5">
          Calculate max augment(titan) increase for stat
        </Typography>
        <Tooltip
          title={
            <Image
              src="/max_augment_increase_example.png"
              alt="max-augment-increase-example"
              width={430}
              height={295}
            />
          }
          slotProps={{ tooltip: { sx: { maxWidth: 'fit-content' } } }}
        >
          <HelpOutlineOutlinedIcon />
        </Tooltip>
      </Stack>
      <Paper sx={{ mt: 1, p: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={4}>
            {statSnap && statState ? (
              <StatEditor
                possibleStatTypes={possibleStatTypes}
                statState={statState}
              />
            ) : (
              <EmptyStatEditor
                possibleStatTypes={possibleStatTypes}
                onStatTypeChange={handleNewStat}
              />
            )}
          </Grid>
          <Grid xs={12}>
            <Typography>
              Max augment increase value:{' '}
              {statSnap
                ? getType(statSnap).isPercentageBased
                  ? toPercentageString2dp(getMaxAugmentIncrease(statSnap))
                  : getMaxAugmentIncrease(statSnap)
                : 0}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );

  function handleNewStat(statType: StatType) {
    state.stat = newRandomStat(statType);
  }
}
