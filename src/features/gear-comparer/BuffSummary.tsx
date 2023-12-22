import { Divider, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { ElementalStyledText } from '../../components/ElementalStyledText/ElementalStyledText';
import { NumericStringPercentage2dp } from '../../components/NumericString/NumericString';
import { gearComparerState } from '../../states/states';

export function BuffSummary() {
  const {
    selectedLoadout: {
      elementalType,
      team: { elementalResonances, weaponResonance },
      weaponBuffs,
      matrixSetBuffs,
      attackBuffTotal,
      critRateBuffTotal,
      critDamageBuffTotal,
    },
  } = useSnapshot(gearComparerState);

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
              <ElementalStyledText elementalType={elementalType}>
                <NumericStringPercentage2dp value={attackBuffTotal} />
              </ElementalStyledText>
            </Typography>
          </Divider>
          <Stack>
            {weaponBuffs.attackPercentBuffs.map((buff, i) => (
              <Typography key={i}>
                {buff.weaponDisplayName} - {buff.displayName} :{' '}
                <ElementalStyledText elementalType={elementalType}>
                  <NumericStringPercentage2dp value={buff.value} />
                </ElementalStyledText>
              </Typography>
            ))}
            {matrixSetBuffs.attackPercentBuffs.map((buff, i) => (
              <Typography key={i}>
                {buff.matrixSetDisplayName} {buff.stars}*:{' '}
                <ElementalStyledText elementalType={elementalType}>
                  <NumericStringPercentage2dp value={buff.value} />
                </ElementalStyledText>
              </Typography>
            ))}
          </Stack>
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <Divider sx={{ my: 1 }}>
            <Typography fontWeight="bold">
              Crit rate % buffs total{' '}
              <ElementalStyledText elementalType={elementalType}>
                {' '}
                <NumericStringPercentage2dp value={critRateBuffTotal} />
              </ElementalStyledText>
            </Typography>
          </Divider>
          <Stack>
            {weaponBuffs.critRateBuffs.map((buff, i) => (
              <Typography key={i}>
                {buff.weaponDisplayName} - {buff.displayName} :{' '}
                <ElementalStyledText elementalType={elementalType}>
                  <NumericStringPercentage2dp value={buff.value} />
                </ElementalStyledText>
              </Typography>
            ))}
            {matrixSetBuffs.critRateBuffs.map((buff, i) => (
              <Typography key={i}>
                {buff.matrixSetDisplayName} {buff.stars}*:{' '}
                <ElementalStyledText elementalType={elementalType}>
                  <NumericStringPercentage2dp value={buff.value} />
                </ElementalStyledText>
              </Typography>
            ))}
          </Stack>
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <Divider sx={{ my: 1 }}>
            <Typography fontWeight="bold">
              Crit damage % buffs total{' '}
              <ElementalStyledText elementalType={elementalType}>
                {' '}
                <NumericStringPercentage2dp value={critDamageBuffTotal} />
              </ElementalStyledText>
            </Typography>
          </Divider>
          <Stack>
            {matrixSetBuffs.critDamageBuffs.map((buff, i) => (
              <Typography key={i}>
                {buff.matrixSetDisplayName} {buff.stars}*:{' '}
                <ElementalStyledText elementalType={elementalType}>
                  <NumericStringPercentage2dp value={buff.value} />
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
            {elementalResonances.join(' & ')} / {weaponResonance}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
