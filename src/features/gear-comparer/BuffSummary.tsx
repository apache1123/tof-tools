import { Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { ElementalStyledText } from '../../components/ElementalStyledText/ElementalStyledText';
import { toPercentageString2dp } from '../../utils/number-utils';
import { matrixSetBuffsState } from './states/derived/matrix-set-buffs';
import { selectedElementalTeamResonancesState } from './states/derived/selected-elemental-team-resonances';
import { weaponBuffsState } from './states/derived/weapon-buffs';
import { gearComparerOptionsState } from './states/gear-comparer-options';

export function BuffSummary() {
  const { selectedElementalType } = useSnapshot(gearComparerOptionsState);
  const { weaponAttackPercentBuffs, weaponCritRateBuffs } =
    useSnapshot(weaponBuffsState);
  const {
    matrixAttackPercentBuffs,
    matrixCritRateBuffs,
    matrixCritDamageBuffs,
  } = useSnapshot(matrixSetBuffsState);
  const { elementalResonance, weaponResonance } = useSnapshot(
    selectedElementalTeamResonancesState
  );

  if (!selectedElementalType) return null;

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" component="h2" mb={3}>
        Buffs included in calculations
      </Typography>
      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={4}>
          <Typography fontWeight="bold">
            Elemental / Weapon resonance
          </Typography>
          <Typography>
            {elementalResonance} / {weaponResonance}
          </Typography>
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <Typography fontWeight="bold">Attack % buffs</Typography>
          <Stack>
            {weaponAttackPercentBuffs.map((buff, i) => (
              <Typography key={i}>
                {buff.weaponDisplayName} - {buff.displayName} :{' '}
                <ElementalStyledText elementalType={selectedElementalType}>
                  {toPercentageString2dp(buff.value)}
                </ElementalStyledText>
              </Typography>
            ))}
            {matrixAttackPercentBuffs.map((buff, i) => (
              <Typography key={i}>
                {buff.matrixSetDisplayName} {buff.stars}*:{' '}
                <ElementalStyledText elementalType={selectedElementalType}>
                  {toPercentageString2dp(buff.value)}
                </ElementalStyledText>
              </Typography>
            ))}
          </Stack>
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <Typography fontWeight="bold">Crit rate % buffs</Typography>
          <Stack>
            {weaponCritRateBuffs.map((buff, i) => (
              <Typography key={i}>
                {buff.weaponDisplayName} - {buff.displayName} :{' '}
                <ElementalStyledText elementalType={selectedElementalType}>
                  {toPercentageString2dp(buff.value)}
                </ElementalStyledText>
              </Typography>
            ))}
            {matrixCritRateBuffs.map((buff, i) => (
              <Typography key={i}>
                {buff.matrixSetDisplayName} {buff.stars}*:{' '}
                <ElementalStyledText elementalType={selectedElementalType}>
                  {toPercentageString2dp(buff.value)}
                </ElementalStyledText>
              </Typography>
            ))}
          </Stack>
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <Typography fontWeight="bold">Crit dmg % buffs</Typography>
          <Stack>
            {matrixCritDamageBuffs.map((buff, i) => (
              <Typography key={i}>
                {buff.matrixSetDisplayName} {buff.stars}*:{' '}
                <ElementalStyledText elementalType={selectedElementalType}>
                  {toPercentageString2dp(buff.value)}
                </ElementalStyledText>
              </Typography>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
