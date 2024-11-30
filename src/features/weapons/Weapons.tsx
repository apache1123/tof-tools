import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { proxy, useSnapshot } from "valtio";

import { WeaponEditorModal } from "../../components/mutational/weapon/WeaponEditorModal/WeaponEditorModal";
import { WeaponDefinitionSelectorModal } from "../../components/presentational/weapon/WeaponDefinitionSelectorModal/WeaponDefinitionSelectorModal";
import { WeaponList } from "../../components/presentational/weapon/WeaponList/WeaponList";
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
          <WeaponList
            weapons={weaponsSnap.getCurrentCharacterWeapons()}
            onClick={(id) => {
              const weaponState = weaponsState.find(id);
              if (weaponState) {
                setEditingWeapon(weaponState);
              }
            }}
          />
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
