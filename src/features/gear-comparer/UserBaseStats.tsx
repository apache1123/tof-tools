import { Box, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import { useSnapshot } from 'valtio';

import { NumericInput } from '../../components/NumericInput/NumericInput';
import { PercentageNumericInput } from '../../components/NumericInput/PercentageNumericInput';
import { maxCharacterLevel } from '../../constants/character-level';
import {
  selectedElementalUserStatsStore,
  setBaseAttackFlatWithGearA,
  setCritDamageWithGearA,
  setCritFlatWithGearA,
  setCritPercentWithGearA,
  setTotalAttackFlatWithGearA,
} from './stores/derived/selected-elemental-user-stats';
import { gearComparerOptionsStore } from './stores/gear-comparer-options';
import {
  setCharacterLevel,
  userStatsStore,
} from './stores/user-stats/user-stats';

export function UserBaseStats() {
  const { selectedElementalType } = useSnapshot(gearComparerOptionsStore);
  const { characterLevel } = useSnapshot(userStatsStore);
  const { selectedElementalUserStats } = useSnapshot(
    selectedElementalUserStatsStore
  );

  if (!selectedElementalType || !selectedElementalUserStats) {
    return null;
  }

  const {
    baseAttackFlatWithGearA,
    totalAttackFlatWithGearA,
    critFlatWithGearA,
    critPercentWithGearA,
    critDamageWithGearA,
  } = selectedElementalUserStats;

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Your stats
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ color: 'warning.main' }}
        gutterBottom
      >
        Fill these in with your <u>current</u> gear equipped (the left/first
        gear above)
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <NumericInput
            id="total-attack"
            label={
              'Total attack' +
              (selectedElementalType ? ` (${selectedElementalType})` : '')
            }
            variant="filled"
            required
            error={!totalAttackFlatWithGearA}
            value={totalAttackFlatWithGearA}
            onChange={setTotalAttackFlatWithGearA}
            helperText={
              <Tooltip
                title={
                  <Image
                    src="/total_attack_example.png"
                    alt="total-attack-example"
                    width={180}
                    height={60}
                  />
                }
              >
                <span>Hover for example</span>
              </Tooltip>
            }
          />
        </Grid>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <NumericInput
            id="base-attack"
            label={
              'Base attack' +
              (selectedElementalType ? ` (${selectedElementalType})` : '')
            }
            variant="filled"
            required
            error={!baseAttackFlatWithGearA}
            value={baseAttackFlatWithGearA}
            onChange={setBaseAttackFlatWithGearA}
            helperText={
              <Tooltip
                title={
                  <Image
                    src="/base_attack_example.png"
                    alt="base-attack-example"
                    width={230}
                    height={90}
                  />
                }
              >
                <span>
                  Hover for example. If you&apos;re using <strong>Lyra</strong>{' '}
                  matrices, make sure they are active.
                </span>
              </Tooltip>
            }
          />
        </Grid>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <NumericInput
            id="crit-flat"
            label="Crit"
            variant="filled"
            required
            error={!critFlatWithGearA}
            value={critFlatWithGearA}
            onChange={setCritFlatWithGearA}
            helperText={
              <Tooltip
                title={
                  <Image
                    src="/crit_flat_example.png"
                    alt="crit-example"
                    width={140}
                    height={60}
                  />
                }
              >
                <span>Hover for example</span>
              </Tooltip>
            }
          />
        </Grid>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <PercentageNumericInput
            id="crit-percent"
            label="Crit %"
            variant="filled"
            required
            error={!critPercentWithGearA}
            value={critPercentWithGearA}
            onChange={setCritPercentWithGearA}
            helperText={
              <Tooltip
                title={
                  <Image
                    src="/crit_percent_example.png"
                    alt="crit-percent-example"
                    width={150}
                    height={60}
                  />
                }
              >
                <span>
                  Hover for example. If you&apos;re using{' '}
                  <strong>Fenrir</strong> matrices, make sure they are active.
                </span>
              </Tooltip>
            }
          />
        </Grid>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <PercentageNumericInput
            id="crit-damage"
            label="Crit Damage %"
            variant="filled"
            required
            error={!critDamageWithGearA}
            value={critDamageWithGearA}
            onChange={setCritDamageWithGearA}
            helperText={
              <Tooltip
                title={
                  <Image
                    src="/crit_damage_example.png"
                    alt="crit-damage-example"
                    width={160}
                    height={60}
                  />
                }
              >
                <span>Hover for example</span>
              </Tooltip>
            }
          />
        </Grid>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <NumericInput
            id="char-level"
            label="Character level"
            variant="filled"
            value={characterLevel}
            onChange={setCharacterLevel}
            helperText={
              characterLevel !== maxCharacterLevel ? (
                <Box component="span" sx={{ color: 'warning.main' }}>
                  Current max character level is {maxCharacterLevel}
                </Box>
              ) : undefined
            }
          />
        </Grid>
      </Grid>
    </>
  );
}
