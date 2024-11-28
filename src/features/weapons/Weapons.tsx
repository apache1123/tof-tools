import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { proxy, useSnapshot } from "valtio";

import { WeaponEditorModal } from "../../components/mutational/WeaponEditorModal/WeaponEditorModal";
import { WeaponDefinitionSelectorModal } from "../../components/presentational/WeaponDefinitionSelectorModal/WeaponDefinitionSelectorModal";
import { WeaponList } from "../../components/presentational/WeaponList/WeaponList";
import { Weapon } from "../../models/weapon/weapon";
import { charactersState, weaponsState } from "../../states/states";

export function Weapons() {
  const charactersSnap = useSnapshot(charactersState);
  const selectedCharacterState = charactersState.selected;
  const selectedCharacterSnap = charactersSnap.selected;

  const weaponsSnap = useSnapshot(weaponsState);

  const [isAddingWeapon, setIsAddingWeapon] = useState(false);
  const [editingWeapon, setEditingWeapon] = useState<Weapon | undefined>(
    undefined,
  );

  return (
    selectedCharacterSnap &&
    selectedCharacterState && (
      <>
        <Stack sx={{ gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              setIsAddingWeapon(true);
            }}
          >
            Add weapon
          </Button>
          <WeaponList weapons={weaponsSnap.getCurrentCharacterWeapons()} />
        </Stack>

        <WeaponDefinitionSelectorModal
          open={isAddingWeapon}
          weaponDefinitions={weaponsSnap.getCanAddWeaponDefinitions()}
          onSelect={(weaponDefinition) => {
            const weapon = proxy(
              new Weapon(weaponDefinition, selectedCharacterSnap.id),
            );
            weaponsState.add(weapon);

            setIsAddingWeapon(false);
            setEditingWeapon(weapon);
          }}
          onCancel={() => {
            setIsAddingWeapon(false);
          }}
        />

        {editingWeapon && (
          <WeaponEditorModal
            open={!!editingWeapon}
            onClose={() => {
              setEditingWeapon(undefined);
            }}
            weaponState={editingWeapon}
          />
        )}
      </>
    )
  );
}
