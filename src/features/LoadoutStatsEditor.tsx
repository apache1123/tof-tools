import { Box, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import { useSnapshot } from 'valtio';

import { NumericInput } from '../components/NumericInput/NumericInput';
import { maxCharacterLevel } from '../constants/character-level';
import type { LoadoutStats } from '../models/loadout-stats';
import { userStatsState } from '../states/states';

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
    activeElementalAttack: { baseAttack },
    critFlat,
  } = loadoutStatsSnap;

  const { characterLevel } = useSnapshot(userStatsState);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Stats
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        You can find these values on the Wanderer screen.
      </Typography>

      <Grid container spacing={2}>
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
                  <Typography
                    variant="inherit"
                    component="span"
                    color="info.main"
                  >
                    This is the <b>NOT</b> your elemental attack value you see
                    on the Wanderer screen.{' '}
                  </Typography>
                  <Typography variant="inherit" component="span">
                    Instead, it is the first number when you click on your
                    elemental attack value. Click here for example
                  </Typography>
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
          <NumericInput
            id="char-level"
            label="Wanderer level"
            variant="filled"
            value={characterLevel}
            onChange={(value) => {
              userStatsState.characterLevel = value;
            }}
            helperText={
              characterLevel !== maxCharacterLevel ? (
                <Box component="span" sx={{ color: 'warning.main' }}>
                  Current max wanderer level is {maxCharacterLevel}
                </Box>
              ) : undefined
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
}
