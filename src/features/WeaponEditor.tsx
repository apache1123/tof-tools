import { Stack } from "@mui/material";
import type { ReactNode } from "react";

import { WeaponDefinitionSelector } from "../components/presentational/WeaponDefinitionSelector/WeaponDefinitionSelector";
import { WeaponIcon } from "../components/presentational/WeaponIcon/WeaponIcon";
import { WeaponStarsSelector } from "../components/presentational/WeaponStarsSelector/WeaponStarsSelector";
import type { Weapon as WeaponDefinition } from "../definitions/types/weapon/weapon";
import type { Weapon } from "../models/weapon";
import { WeaponMatrixSetsEditor } from "./WeaponMatrixSetsEditor";

export interface WeaponEditorProps {
  weaponSnap: Weapon;
  weaponState: Weapon;
  ["data-testid"]?: string;

  onClearWeapon(): void;
}

export function WeaponEditor({
  weaponSnap,
  weaponState,
  onClearWeapon,
  "data-testid": dataTestId,
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
            if (definition) {
              weaponState.definition = definition;
            } else {
              onClearWeapon();
            }
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
  ["data-testid"]?: string;

  onWeaponDefinitionChange(weaponDefinition: WeaponDefinition): void;
}

export function EmptyWeaponEditor({
  onWeaponDefinitionChange,
  "data-testid": dataTestId,
}: EmptyWeaponEditorProps) {
  return (
    <Layout
      icon={<WeaponIcon weaponName={undefined} />}
      definitionSelector={
        <WeaponDefinitionSelector
          selectedWeaponDefinition={undefined}
          onChange={(definition) => {
            if (definition) onWeaponDefinitionChange(definition);
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
  "data-testid": dataTestId,
}: {
  icon: ReactNode;
  definitionSelector: ReactNode;
  starsSelector: ReactNode;
  matrixSetsEditor?: ReactNode;
  ["data-testid"]?: string;
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
