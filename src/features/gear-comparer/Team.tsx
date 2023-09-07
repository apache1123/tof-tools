import { Divider, Stack, Typography, useMediaQuery } from '@mui/material';
import { useSnapshot } from 'valtio';

import { setWeapon1, setWeapon2, setWeapon3 } from '../../models/team';
import { newWeapon } from '../../models/weapon';
import theme from '../../theme';
import { EmptyWeaponEditor, WeaponEditor } from '../WeaponEditor';
import { selectedElementalTeamState } from './states/derived/selected-elemental-team';

export function Team() {
  const { selectedElementalTeam } = selectedElementalTeamState;
  const { selectedElementalTeam: selectedElementalTeamSnap } = useSnapshot(
    selectedElementalTeamState
  );

  const stackDividerOrientation = useMediaQuery(theme.breakpoints.down('sm'))
    ? 'horizontal'
    : 'vertical';

  if (!selectedElementalTeamSnap) return null;
  if (!selectedElementalTeam) return null;

  const {
    weapon1: weapon1State,
    weapon2: weapon2State,
    weapon3: weapon3State,
  } = selectedElementalTeam;
  const {
    weapon1: weapon1Snap,
    weapon2: weapon2Snap,
    weapon3: weapon3Snap,
  } = selectedElementalTeamSnap;

  return (
    <>
      <Typography variant="subtitle2" gutterBottom>
        This is optional, but if you fill this in the calculation will take into
        account the buffs from weapons & matrices
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-evenly"
        spacing={5}
        divider={
          <Divider orientation={stackDividerOrientation} flexItem={true} />
        }
        useFlexGap
        flexWrap="wrap"
        mt={2}
      >
        {weapon1Snap && weapon1State ? (
          <WeaponEditor
            weaponState={weapon1State}
            onClearWeapon={() => setWeapon1(selectedElementalTeam, undefined)}
            data-testid="weapon1"
          />
        ) : (
          <EmptyWeaponEditor
            onWeaponDefinitionChange={(definition) => {
              setWeapon1(selectedElementalTeam, newWeapon(definition));
            }}
            data-testid="weapon1"
          />
        )}
        {weapon2Snap && weapon2State ? (
          <WeaponEditor
            weaponState={weapon2State}
            onClearWeapon={() => setWeapon2(selectedElementalTeam, undefined)}
            data-testid="weapon2"
          />
        ) : (
          <EmptyWeaponEditor
            onWeaponDefinitionChange={(definition) => {
              setWeapon2(selectedElementalTeam, newWeapon(definition));
            }}
            data-testid="weapon2"
          />
        )}
        {weapon3Snap && weapon3State ? (
          <WeaponEditor
            weaponState={weapon3State}
            onClearWeapon={() => setWeapon3(selectedElementalTeam, undefined)}
            data-testid="weapon3"
          />
        ) : (
          <EmptyWeaponEditor
            onWeaponDefinitionChange={(definition) => {
              setWeapon3(selectedElementalTeam, newWeapon(definition));
            }}
            data-testid="weapon3"
          />
        )}
      </Stack>
    </>
  );
}
