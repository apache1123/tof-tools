import { Stack } from '@mui/material';
import type { ReactNode } from 'react';
import { useSnapshot } from 'valtio';

import { WeaponDefinitionSelector } from '../components/WeaponDefinitionSelector/WeaponDefinitionSelector';
import { WeaponIcon } from '../components/WeaponIcon/WeaponIcon';
import { WeaponStarsSelector } from '../components/WeaponStarsSelector.tsx/WeaponStarsSelector';
import type { Weapon } from '../models/weapon';
import { getDefinition, setDefinition, setStars } from '../models/weapon';
import type { WeaponDefinition } from '../models/weapon-definition';
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
    <Layout
      icon={<WeaponIcon weaponName={weaponDefinition.id} />}
      definitionSelector={
        <WeaponDefinitionSelector
          selectedWeaponDefinition={weaponDefinition}
          onChange={(definition) => {
            definition
              ? setDefinition(weaponState, definition)
              : onClearWeapon();
          }}
        />
      }
      starsSelector={
        <WeaponStarsSelector
          stars={weaponSnap.stars}
          onStarsChange={(stars) => {
            setStars(weaponState, stars);
          }}
        />
      }
      matrixSetsEditor={
        <WeaponMatrixSetsEditor
          weaponMatrixSetsState={weaponState.matrixSets}
        />
      }
    />
  );
}

export interface EmptyWeaponEditorProps {
  onWeaponDefinitionChange(weaponDefinition: WeaponDefinition): void;
}

export function EmptyWeaponEditor({
  onWeaponDefinitionChange,
}: EmptyWeaponEditorProps) {
  return (
    <Layout
      icon={<WeaponIcon weaponName={undefined} />}
      definitionSelector={
        <WeaponDefinitionSelector
          selectedWeaponDefinition={undefined}
          onChange={(definition) => {
            definition && onWeaponDefinitionChange(definition);
          }}
        />
      }
      starsSelector={<WeaponStarsSelector stars={0} disabled />}
    />
  );
}

function Layout({
  icon,
  definitionSelector,
  starsSelector,
  matrixSetsEditor,
}: {
  icon: ReactNode;
  definitionSelector: ReactNode;
  starsSelector: ReactNode;
  matrixSetsEditor?: ReactNode;
}) {
  return (
    <Stack spacing={4} flexGrow={1}>
      <Stack alignItems="center" spacing={1}>
        {icon}
        {definitionSelector}
        {starsSelector}
      </Stack>
      {matrixSetsEditor}
    </Stack>
  );
}
