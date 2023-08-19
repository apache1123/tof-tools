import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSnapshot } from 'valtio';

import { WeaponDefinitionSelector } from '../../components/WeaponDefinitionSelector/WeaponDefinitionSelector';
import { setWeapon1, setWeapon2, setWeapon3 } from '../../models/team';
import { newWeapon } from '../../models/weapon';
import { WeaponEditor } from '../WeaponEditor';
import { selectedElementalTeamState } from './states/derived/selected-elemental-team';

export function Team() {
  const { selectedElementalTeam } = selectedElementalTeamState;
  const { selectedElementalTeam: selectedElementalTeamSnap } = useSnapshot(
    selectedElementalTeamState
  );

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
    <Grid container spacing={3}>
      <Grid xs={12} sm={4}>
        {weapon1Snap && weapon1State ? (
          <WeaponEditor
            weaponState={weapon1State}
            onClearWeapon={() => setWeapon1(selectedElementalTeam, undefined)}
          />
        ) : (
          <WeaponDefinitionSelector
            selectedWeaponDefinition={undefined}
            onChange={(definition) => {
              if (definition)
                setWeapon1(selectedElementalTeam, newWeapon(definition));
            }}
          />
        )}
      </Grid>
      <Grid xs={12} sm={4}>
        {weapon2Snap && weapon2State ? (
          <WeaponEditor
            weaponState={weapon2State}
            onClearWeapon={() => setWeapon2(selectedElementalTeam, undefined)}
          />
        ) : (
          <WeaponDefinitionSelector
            selectedWeaponDefinition={undefined}
            onChange={(definition) => {
              if (definition)
                setWeapon2(selectedElementalTeam, newWeapon(definition));
            }}
          />
        )}
      </Grid>
      <Grid xs={12} sm={4}>
        {weapon3Snap && weapon3State ? (
          <WeaponEditor
            weaponState={weapon3State}
            onClearWeapon={() => setWeapon3(selectedElementalTeam, undefined)}
          />
        ) : (
          <WeaponDefinitionSelector
            selectedWeaponDefinition={undefined}
            onChange={(definition) => {
              if (definition)
                setWeapon3(selectedElementalTeam, newWeapon(definition));
            }}
          />
        )}
      </Grid>

      <Box mt={5}>{JSON.stringify(selectedElementalTeamSnap)}</Box>
    </Grid>
  );
}
