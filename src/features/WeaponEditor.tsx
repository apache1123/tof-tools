import { Stack } from '@mui/material';
import type { ReactNode } from 'react';

import { WeaponDefinitionSelector } from '../components/WeaponDefinitionSelector/WeaponDefinitionSelector';
import { WeaponIcon } from '../components/WeaponIcon/WeaponIcon';
import { WeaponStarsSelector } from '../components/WeaponStarsSelector/WeaponStarsSelector';
import type { Weapon as WeaponDefinition } from '../definitions/types/weapon/weapon';
import type { Weapon } from '../models/weapon';
import { WeaponMatrixSetsEditor } from './WeaponMatrixSetsEditor';

export interface WeaponEditorProps {
  weaponSnap: Weapon;
  weaponState: Weapon;
  onClearWeapon(): void;
  ['data-testid']?: string;
}

export function WeaponEditor({
  weaponSnap,
  weaponState,
  onClearWeapon,
  'data-testid': dataTestId,
}: WeaponEditorProps) {
  const weaponDefinition = weaponSnap.definition;

  return (
    <Layout
      icon={
        <WeaponIcon
          weaponName={weaponDefinition.iconWeaponName ?? weaponDefinition.id}
          elementalIcon={weaponDefinition.elementalIcon}
        />
      }
      definitionSelector={
        <WeaponDefinitionSelector
          selectedWeaponDefinition={weaponDefinition}
          onChange={(definition) => {
            definition
              ? (weaponState.definition = definition)
              : onClearWeapon();
          }}
        />
      }
      starsSelector={
        <WeaponStarsSelector
          stars={weaponSnap.stars}
          onStarsChange={(stars) => {
            weaponState.stars = stars;
          }}
        />
      }
      matrixSetsEditor={
        <WeaponMatrixSetsEditor
          weaponMatrixSetsSnap={weaponSnap.matrixSets}
          weaponMatrixSetsState={weaponState.matrixSets}
        />
      }
      data-testid={dataTestId}
    />
  );
}

export interface EmptyWeaponEditorProps {
  onWeaponDefinitionChange(weaponDefinition: WeaponDefinition): void;
  ['data-testid']?: string;
}

export function EmptyWeaponEditor({
  onWeaponDefinitionChange,
  'data-testid': dataTestId,
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
      data-testid={dataTestId}
    />
  );
}

function Layout({
  icon,
  definitionSelector,
  starsSelector,
  matrixSetsEditor,
  'data-testid': dataTestId,
}: {
  icon: ReactNode;
  definitionSelector: ReactNode;
  starsSelector: ReactNode;
  matrixSetsEditor?: ReactNode;
  ['data-testid']?: string;
}) {
  return (
    <Stack spacing={4} flexGrow={1} data-testid={dataTestId}>
      <Stack alignItems="center" spacing={1}>
        {icon}
        {definitionSelector}
        {starsSelector}
      </Stack>
      {matrixSetsEditor}
    </Stack>
  );
}
