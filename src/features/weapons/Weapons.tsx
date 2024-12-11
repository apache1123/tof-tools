import { Button } from "@mui/material";
import { useState } from "react";
import { proxy, useSnapshot } from "valtio";

import { WeaponEditorModal } from "../../components/mutational/weapon/WeaponEditorModal/WeaponEditorModal";
import { WeaponDefinitionSelectorModal } from "../../components/presentational/weapon/WeaponDefinitionSelectorModal/WeaponDefinitionSelectorModal";
import { WeaponList } from "../../components/presentational/weapon/WeaponList/WeaponList";
import { db } from "../../db/reactive-local-storage-db";
import type { Repository } from "../../db/repository/types/repository";
import { weaponDefinitions } from "../../definitions/weapons/weapon-definitions";
import { Weapon } from "../../models/weapon/weapon";
import { useSelectedCharacter } from "../characters/useSelectedCharacter";
import { InventoryLayout } from "../common/InventoryLayout";
import { useMatrices } from "../matrices/useMatrices";

export function Weapons() {
  const { selectedCharacterId } = useSelectedCharacter();

  const weaponRepoProxy = db.get("weapons");
  const weaponRepo = useSnapshot(weaponRepoProxy) as Repository<Weapon>;
  const weapons = selectedCharacterId
    ? weaponRepo.filter((weapon) => weapon.characterId === selectedCharacterId)
    : [];

  const unusedWeaponDefinitions = weaponDefinitions.allIds
    .filter((id) => {
      return !weapons.some((weapon) => weapon.id === id);
    })
    .map((id) => weaponDefinitions.byId[id]);

  const { matricesProxy } = useMatrices(selectedCharacterId);

  const [isAddingWeapon, setIsAddingWeapon] = useState(false);
  const [editingWeapon, setEditingWeapon] = useState<Weapon | undefined>(
    undefined,
  );

  return (
    selectedCharacterId && (
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
              weapons={weapons}
              onClick={(id) => {
                const weaponProxy = weaponRepoProxy.find(id);
                if (weaponProxy) {
                  setEditingWeapon(weaponProxy);
                }
              }}
            />
          }
        />

        <WeaponDefinitionSelectorModal
          open={isAddingWeapon}
          weaponDefinitions={unusedWeaponDefinitions}
          onSelect={(weaponDefinition) => {
            const weapon = proxy(
              new Weapon(weaponDefinition, selectedCharacterId),
            );
            weaponRepoProxy.add(weapon);

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
            weaponProxy={editingWeapon}
            allMatricesProxy={matricesProxy}
          />
        )}
      </>
    )
  );
}
