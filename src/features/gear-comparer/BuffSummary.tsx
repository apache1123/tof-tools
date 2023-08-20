import { Box, Paper, Stack, Typography } from '@mui/material';
import { useSnapshot } from 'valtio';

import { toPercentageString2dp } from '../../utils/number-utils';
import { matrixSetBuffsState } from './states/derived/matrix-set-buffs';
import { selectedElementalTeamResonancesState } from './states/derived/selected-elemental-team-resonances';
import { weaponBuffsState } from './states/derived/weapon-buffs';

export function BuffSummary() {
  const { weaponAttackPercentBuffs, weaponCritRateBuffs } =
    useSnapshot(weaponBuffsState);
  const { matrixAttackPercentBuffs, matrixCritRateBuffs, matrixCritDamageBuffs } =
    useSnapshot(matrixSetBuffsState);
  const { elementalResonance, weaponResonance } = useSnapshot(
    selectedElementalTeamResonancesState
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Box>
          <Typography>Resonances</Typography>
          <Typography>
            {elementalResonance} / {weaponResonance}
          </Typography>
        </Box>

        <Box>
          <Typography>Attack % buffs</Typography>
          <Stack>
            {weaponAttackPercentBuffs.map((buff, i) => (
              <Typography key={i}>
                {buff.weaponDisplayName}: {buff.displayName} -{' '}
                {toPercentageString2dp(buff.value)}
              </Typography>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography>Crit rate % buffs</Typography>
          <Stack>
            {weaponCritRateBuffs.map((buff, i) => (
              <Typography key={i}>
                {buff.weaponDisplayName}: {buff.displayName} -{' '}
                {toPercentageString2dp(buff.value)}
              </Typography>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography>Matrix attack % buffs</Typography>
          <Stack>
            {matrixAttackPercentBuffs.map((buff, i) => (
              <Typography key={i}>
                {buff.matrixSetDisplayName} {buff.stars}*:{' '}
                {toPercentageString2dp(buff.value)}
              </Typography>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography>Matrix crit rate % buffs</Typography>
          <Stack>
            {matrixCritRateBuffs.map((buff, i) => (
              <Typography key={i}>
                {buff.matrixSetDisplayName} {buff.stars}*:{' '}
                {toPercentageString2dp(buff.value)}
              </Typography>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography>Matrix crit dmg % buffs</Typography>
          <Stack>
            {matrixCritDamageBuffs.map((buff, i) => (
              <Typography key={i}>
                {buff.matrixSetDisplayName} {buff.stars}*:{' '}
                {toPercentageString2dp(buff.value)}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
