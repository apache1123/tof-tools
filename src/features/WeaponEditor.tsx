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
  ['data-test-id']?: string;
}

export function WeaponEditor({
  weaponState,
  onClearWeapon,
  'data-test-id': dataTestId,
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
      data-test-id={dataTestId}
    />
  );
}

export interface EmptyWeaponEditorProps {
  onWeaponDefinitionChange(weaponDefinition: WeaponDefinition): void;
  ['data-test-id']?: string;
}

export function EmptyWeaponEditor({
  onWeaponDefinitionChange,
  'data-test-id': dataTestId,
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
      data-test-id={dataTestId}
    />
  );
}

function Layout({
  icon,
  definitionSelector,
  starsSelector,
  matrixSetsEditor,
  'data-test-id': dataTestId,
}: {
  icon: ReactNode;
  definitionSelector: ReactNode;
  starsSelector: ReactNode;
  matrixSetsEditor?: ReactNode;
  ['data-test-id']?: string;
}) {
  return (
    <Stack spacing={4} flexGrow={1} data-test-id={dataTestId}>
      <Stack alignItems="center" spacing={1}>
        {icon}
        {definitionSelector}
        {starsSelector}
      </Stack>
      {matrixSetsEditor}
    </Stack>
  );
}
