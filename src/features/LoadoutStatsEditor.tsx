import { Box, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import { useSnapshot } from 'valtio';

import { NumericInput } from '../components/NumericInput/NumericInput';
import { PercentageNumericInput } from '../components/NumericInput/PercentageNumericInput';
import { maxCharacterLevel } from '../constants/character-level';
import type { LoadoutStats } from '../models/loadout-stats';
import { userStatsState } from './gear-comparer/states/user-stats/user-stats';

export interface LoadoutStatsEditorProps {
  loadoutStatsSnap: LoadoutStats;
  loadoutStatsState: LoadoutStats;
}

export function LoadoutStatsEditor({
  loadoutStatsSnap,
  loadoutStatsState,
}: LoadoutStatsEditorProps) {
  const {
    loadout: { elementalType },
    activeElementalAttack: { totalAttack, baseAttack },
    critFlat,
    critPercent,
    critDamage,
  } = loadoutStatsSnap;

  const { characterLevel } = useSnapshot(userStatsState);

  return (
    <>
      <Typography variant="subtitle2" sx={{ color: 'warning.main', mb: 2 }}>
        {/* Fill these in with your <u>current</u> gear equipped (the left/first
        gear below).  */}
        You can find these values on the Wanderer screen.
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <NumericInput
            id="total-attack"
            label={
              'Total attack' + (elementalType ? ` (${elementalType})` : '')
            }
            variant="filled"
            required
            error={!totalAttack}
            value={totalAttack}
            onChange={(value) => {
              loadoutStatsState.activeElementalAttack.totalAttack = value;
            }}
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
                    Lyra 2pc, Rubilia 2pc or Ming Jing 2pc
                  </Typography>{' '}
                  matrices, make sure the atk% buff is active. Click here for
                  example
                </span>
              </Tooltip>
            }
          />
        </Grid>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <NumericInput
            id="base-attack"
            label={'Base attack' + (elementalType ? ` (${elementalType})` : '')}
            variant="filled"
            required
            error={!baseAttack}
            value={baseAttack}
            onChange={(value) => {
              loadoutStatsState.activeElementalAttack.baseAttack = value;
            }}
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
                  This is the first number when you click on your elemental
                  attack number on the Wanderer screen. Click here for example
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
            error={!critFlat}
            value={critFlat}
            onChange={(value) => {
              loadoutStatsState.critFlat = value;
            }}
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
                <span>Click here for example</span>
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
            value={critPercent}
            onChange={(value) => {
              loadoutStatsState.critPercent = value;
            }}
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
                    Fenrir 6*
                  </Typography>
                  , make sure the crit% buff is active. Click here for example
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
            error={!critDamage}
            value={critDamage}
            onChange={(value) => {
              loadoutStatsState.critDamage = value;
            }}
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
                    Scylla 2pc
                  </Typography>{' '}
                  matrices, make sure the crit dmg% buff is active. Click here
                  for example
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