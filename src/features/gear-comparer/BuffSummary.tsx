import { Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { ElementalStyledText } from '../../components/ElementalStyledText/ElementalStyledText';
import { toPercentageString2dp } from '../../utils/number-utils';
import { buffTotalsState } from './states/derived/buff-totals';
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
  const { attackBuffTotal, critRateBuffTotal, critDamageBuffTotal } =
    useSnapshot(buffTotalsState);
  const { elementalResonance, weaponResonance } = useSnapshot(
    selectedElementalTeamResonancesState
  );

  if (!selectedElementalType) return null;

  return (
    <>
      <Typography variant="h5" component="h2" mb={3}>
        Weapons & matrices buffs included in calculations
      </Typography>
      <Grid container spacing={4}>
        <Grid xs={12} sm={6} md={4}>
          <Divider sx={{ my: 1 }}>
            <Typography fontWeight="bold">
              Attack % buffs total{' '}
              <ElementalStyledText elementalType={selectedElementalType}>
                {toPercentageString2dp(attackBuffTotal)}
              </ElementalStyledText>
            </Typography>
          </Divider>
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
          <Divider sx={{ my: 1 }}>
            <Typography fontWeight="bold">
              Crit rate % buffs total{' '}
              <ElementalStyledText elementalType={selectedElementalType}>
                {' '}
                {toPercentageString2dp(critRateBuffTotal)}
              </ElementalStyledText>
            </Typography>
          </Divider>
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
          <Divider sx={{ my: 1 }}>
            <Typography fontWeight="bold">
              Crit damage % buffs total{' '}
              <ElementalStyledText elementalType={selectedElementalType}>
                {' '}
                {toPercentageString2dp(critDamageBuffTotal)}{' '}
              </ElementalStyledText>
            </Typography>
          </Divider>
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

        <Grid xs={12} sm={6} md={4}>
          <Typography fontWeight="bold">
            Elemental / Weapon resonance
          </Typography>
          <Typography>
            {elementalResonance} / {weaponResonance}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
