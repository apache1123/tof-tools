import { Box, Paper, Stack, Typography } from '@mui/material';
import { proxy, useSnapshot } from 'valtio';

import { NumericInput } from '../../components/NumericInput/NumericInput';
import { NumericStringPercentage2dp } from '../../components/NumericString/NumericString';
import { maxCharacterLevel } from '../../definitions/character-level';
import { calculateCritRatePercentFromFlat } from '../../utils/stat-calculation-utils';

const state = proxy<{ critFlat: number; characterLevel: number }>({
  critFlat: 0,
  characterLevel: maxCharacterLevel,
});

export function CritFlatToPercent() {
  const snap = useSnapshot(state);

  const critPercent = calculateCritRatePercentFromFlat(
    snap.critFlat,
    snap.characterLevel
  );

  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h5">Calculate crit rate % from crit</Typography>
      </Stack>
      <Paper sx={{ mt: 1, p: 2 }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <Box width={200}>
              <NumericInput
                id="crit-flat"
                label="Crit"
                variant="filled"
                value={snap.critFlat}
                onChange={(value) => {
                  state.critFlat = value;
                }}
              />
            </Box>
            <Box width={200}>
              <NumericInput
                id="char-level"
                label="Character level"
                variant="filled"
                value={snap.characterLevel}
                onChange={(value) => {
                  state.characterLevel = value;
                }}
                helperText={
                  snap.characterLevel !== maxCharacterLevel ? (
                    <Box component="span" sx={{ color: 'warning.main' }}>
                      Current max character level is {maxCharacterLevel}
                    </Box>
                  ) : undefined
                }
              />
            </Box>
          </Stack>
          <Typography>
            Crit rate %: <NumericStringPercentage2dp value={critPercent} />
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
