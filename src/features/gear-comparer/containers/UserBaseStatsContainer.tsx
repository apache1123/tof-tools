import { Box, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import { useSnapshot } from 'valtio';

import { NumericInput } from '../../../components/NumericInput/NumericInput';
import { maxCharacterLevel } from '../../../constants/character-level';
import {
  setBaseAttackFlatWithGearA,
  setCharacterLevel,
  setCritFlatWithGearA,
  userStatsStore,
} from '../stores/user-stats';

export function UserBaseStatContainer() {
  const {
    elementalType,
    baseAttackFlatWithGearA,
    critFlatWithGearA,
    characterLevel,
  } = useSnapshot(userStatsStore);

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
        Fill these in with your <em>current</em> gear equipped (the gear on the
        left above)
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <NumericInput
            id="base-attack"
            label={'Base attack' + (elementalType ? ` (${elementalType})` : '')}
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
                <span>Found on character sheet. Example</span>
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
            helperText="Found on character sheet"
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
