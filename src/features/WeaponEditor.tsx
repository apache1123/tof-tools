import { Stack } from '@mui/material';
import { useSnapshot } from 'valtio';

import { WeaponDefinitionSelector } from '../components/WeaponDefinitionSelector/WeaponDefinitionSelector';
import { WeaponStarsSelector } from '../components/WeaponStarsSelector.tsx/WeaponStarsSelector';
import type { Weapon } from '../models/weapon';
import { getDefinition, setDefinition, setStars } from '../models/weapon';
import { WeaponMatrixSetsEditor } from './WeaponMatrixSetsEditor';

export interface WeaponEditorProps {
  weaponState: Weapon;
  onClearWeapon(): void;
}

export function WeaponEditor({
  weaponState,
  onClearWeapon,
}: WeaponEditorProps) {
  const weaponSnap = useSnapshot(weaponState);
  const weaponDefinition = getDefinition(weaponSnap);

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <WeaponDefinitionSelector
          selectedWeaponDefinition={weaponDefinition}
          onChange={(definition) => {
            definition
              ? setDefinition(weaponState, definition)
              : onClearWeapon();
          }}
        />
        <WeaponStarsSelector
          stars={weaponSnap.stars}
          onStarsChange={(stars) => {
            setStars(weaponState, stars);
          }}
        />
      </Stack>
      <WeaponMatrixSetsEditor weaponMatrixSetsState={weaponState.matrixSets} />
    </Stack>
  );
}
