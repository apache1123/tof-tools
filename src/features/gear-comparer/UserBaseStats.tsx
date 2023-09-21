import { Box, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import { useSnapshot } from 'valtio';

import { NumericInput } from '../../components/NumericInput/NumericInput';
import { PercentageNumericInput } from '../../components/NumericInput/PercentageNumericInput';
import { maxCharacterLevel } from '../../constants/character-level';
import {
  selectedElementalUserStatsState,
  setBaseAttackFlatWithGearA,
  setCritDamageWithGearA,
  setCritFlatWithGearA,
  setCritPercentWithGearA,
  setTotalAttackFlatWithGearA,
} from './states/derived/selected-elemental-user-stats';
import { gearComparerOptionsState } from './states/gear-comparer-options';
import { userStatsState } from './states/user-stats/user-stats';

export function UserBaseStats() {
  const { selectedElementalType } = useSnapshot(gearComparerOptionsState);
  const { characterLevel } = useSnapshot(userStatsState);
  const { selectedElementalUserStats } = useSnapshot(
    selectedElementalUserStatsState
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
      <Typography
        variant="subtitle2"
        sx={{ color: 'warning.main' }}
        gutterBottom
      >
        Fill these in with your <u>current</u> gear equipped (the left/first
        gear below)
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
                <span>
                  If you&apos;re using{' '}
                  <Typography
                    variant="inherit"
                    component="span"
                    color="info.main"
                    fontWeight="bold"
                  >
                    Lyra, Rubilia or Ming Jing
                  </Typography>{' '}
                  matrices, make sure they are active. Hover for example
                </span>
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
                <span>Hover for example</span>
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
                  If you&apos;re using{' '}
                  <Typography
                    variant="inherit"
                    component="span"
                    color="info.main"
                    fontWeight="bold"
                  >
                    Fenrir
                  </Typography>{' '}
                  matrices, make sure they are active. Hover for example
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
                <span>
                  If you&apos;re using{' '}
                  <Typography
                    variant="inherit"
                    component="span"
                    color="info.main"
                    fontWeight="bold"
                  >
                    Scylla
                  </Typography>{' '}
                  matrices, make sure they are active. Hover for example
                </span>
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
            onChange={(value) => {
              userStatsState.characterLevel = value;
            }}
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
