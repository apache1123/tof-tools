import { Box, Tooltip, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import { useSnapshot } from 'valtio';

import { NumericInput } from '../../../components/NumericInput/NumericInput';
import { maxCharacterLevel } from '../../../constants/character-level';
import {
  setCharacterLevel,
  setCritFlat,
  setOtherAttackFlat,
  userStatsStore,
} from '../stores/user-stats';

export function UserBaseStatContainer() {
  const { elementalType, otherAttackFlat, critFlat, characterLevel } =
    useSnapshot(userStatsStore);

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
        Take off the piece of gear you&apos;re currently comparing for the
        following:
      </Typography>

      <Grid container spacing={2}>
        <Grid xs={12} sm={6} md={4} lg={3}>
          <NumericInput
            id="base-attack"
            label={'Base attack' + (elementalType ? ` (${elementalType})` : '')}
            variant="filled"
            required
            error={!otherAttackFlat}
            value={otherAttackFlat}
            onChange={setOtherAttackFlat}
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
            error={!critFlat}
            value={critFlat}
            onChange={setCritFlat}
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
