import { Button } from "@mui/material";
import { useState } from "react";
import { proxy, useSnapshot } from "valtio";

import { WeaponDefinitionSelectorModal } from "../../components/weapon/WeaponDefinitionSelectorModal/WeaponDefinitionSelectorModal";
import { WeaponList } from "../../components/weapon/WeaponList/WeaponList";
import { db } from "../../db/reactive-local-storage-db";
import type { Repository } from "../../db/repository/types/repository";
import { getAllWeaponDefinitions } from "../../definitions/weapons/weapon-definitions";
import type { WeaponId } from "../../models/weapon/weapon";
import { Weapon } from "../../models/weapon/weapon";
import { useSelectedCharacter } from "../characters/useSelectedCharacter";
import { InventoryLayout } from "../common/InventoryLayout";
import { EditWeapon } from "./EditWeapon";

export function Weapons() {
  const { selectedCharacterId } = useSelectedCharacter();

  const weaponRepoProxy = db.get("weapons");
  const weaponRepo = useSnapshot(weaponRepoProxy) as Repository<Weapon>;
  const weapons = selectedCharacterId
    ? weaponRepo.filter((weapon) => weapon.characterId === selectedCharacterId)
    : [];

  const unusedWeaponDefinitions = getAllWeaponDefinitions().filter(
    (definition) =>
      !weapons.some((weapon) => weapon.definitionId === definition.id),
  );

  const [isAddingWeapon, setIsAddingWeapon] = useState(false);
  const [editingWeaponId, setEditingWeaponId] = useState<WeaponId | undefined>(
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
                setEditingWeaponId(id);
              }}
            />
          }
        />

        <WeaponDefinitionSelectorModal
          open={isAddingWeapon}
          weaponDefinitions={unusedWeaponDefinitions}
          onSelect={(weaponDefinition) => {
            const weapon = proxy(
              new Weapon(weaponDefinition, selectedCharacterId, undefined),
            );
            weaponRepoProxy.add(weapon);

            setIsAddingWeapon(false);
            setEditingWeaponId(weapon.id);
          }}
          onCancel={() => {
            setIsAddingWeapon(false);
          }}
        />

        {editingWeaponId && (
          <EditWeapon
            id={editingWeaponId}
            onFinishEdit={() => {
              setEditingWeaponId(undefined);
            }}
          />
        )}
      </>
    )
  );
}
