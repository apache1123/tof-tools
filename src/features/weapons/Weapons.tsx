import { Button } from "@mui/material";
import { useState } from "react";
import { proxy, useSnapshot } from "valtio";

import { WeaponEditorModal } from "../../components/mutational/weapon/WeaponEditorModal/WeaponEditorModal";
import { WeaponDefinitionSelectorModal } from "../../components/presentational/weapon/WeaponDefinitionSelectorModal/WeaponDefinitionSelectorModal";
import { WeaponList } from "../../components/presentational/weapon/WeaponList/WeaponList";
import { Weapon } from "../../models/weapon/weapon";
import { weaponsState } from "../../states/states";
import { useSelectedCharacter } from "../characters/useSelectedCharacter";
import { InventoryLayout } from "../common/InventoryLayout";

export function Weapons() {
  const { selectedCharacterState, selectedCharacterSnap } =
    useSelectedCharacter();

  const weaponsSnap = useSnapshot(weaponsState);

  const [isAddingWeapon, setIsAddingWeapon] = useState(false);
  const [editingWeapon, setEditingWeapon] = useState<Weapon | undefined>(
    undefined,
  );

  return (
    selectedCharacterSnap &&
    selectedCharacterState && (
      <>
        <InventoryLayout
          filter={undefined}
          actions={
            <Button
              variant="contained"
              onClick={() => {
                setIsAddingWeapon(true);
              }}
            >
              Add weapon
            </Button>
          }
          items={
            <WeaponList
              weapons={weaponsSnap.getCurrentCharacterWeapons()}
              onClick={(id) => {
                const weaponState = weaponsState.find(id);
                if (weaponState) {
                  setEditingWeapon(weaponState);
                }
              }}
            />
          }
        />

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
