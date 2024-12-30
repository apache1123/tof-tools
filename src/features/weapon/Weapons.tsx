import { Button } from "@mui/material";
import { useState } from "react";
import { proxy, useSnapshot } from "valtio";

import { EditorModal } from "../../components/common/Modal/EditorModal";
import { StyledModal } from "../../components/common/Modal/StyledModal";
import { WeaponCard } from "../../components/weapon/WeaponCard/WeaponCard";
import { WeaponDefinitionSelector } from "../../components/weapon/WeaponDefinitionSelector/WeaponDefinitionSelector";
import { db } from "../../db/reactive-local-storage-db";
import { getAllWeaponDefinitions } from "../../definitions/weapons/weapon-definitions";
import type { CharacterId } from "../../models/character/character";
import { Weapon } from "../../models/weapon/weapon";
import { InventoryLayout } from "../common/InventoryLayout";
import { WeaponEditor } from "./WeaponEditor";

export interface WeaponsProps {
  characterId: CharacterId;
}

export function Weapons({ characterId }: WeaponsProps) {
  const weaponRepo = db.get("weapons");

  const weapons = useSnapshot(weaponRepo).filter(
    (weapon) => weapon.characterId === characterId,
  ) as Weapon[];

  const unusedWeaponDefinitions = getAllWeaponDefinitions().filter(
    (definition) =>
      !weapons.some((weapon) => weapon.definitionId === definition.id),
  );

  const [isAddingWeapon, setIsAddingWeapon] = useState(false);
  const [editingWeaponProxy, setEditingWeaponProxy] = useState<
    Weapon | undefined
  >(undefined);

  return (
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
        items={weapons.map((weapon) => (
          <WeaponCard
            key={weapon.id}
            weapon={weapon}
            onClick={() => {
              const weaponProxy = weaponRepo.find(weapon.id);
              if (!weaponProxy) throw new Error("Weapon proxy not found");

              setEditingWeaponProxy(weaponProxy);
            }}
            sx={{ width: 300 }}
          />
        ))}
      />

      <StyledModal
        modalContent={
          <WeaponDefinitionSelector
            weaponDefinitions={unusedWeaponDefinitions}
            onSelect={(weaponDefinition) => {
              const weaponProxy = proxy(
                new Weapon(weaponDefinition, characterId, undefined),
              );
              weaponRepo.add(weaponProxy);

              setIsAddingWeapon(false);
              setEditingWeaponProxy(weaponProxy);
            }}
          />
        }
        open={isAddingWeapon}
        showCancel
        onClose={() => {
          setIsAddingWeapon(false);
        }}
        maxWidth={false}
        fullWidth
      />

      {editingWeaponProxy && (
        <EditorModal
          modalContent={
            <WeaponEditor
              weaponProxy={editingWeaponProxy}
              characterId={characterId}
            />
          }
          open={!!editingWeaponProxy}
          onClose={() => {
            setEditingWeaponProxy(undefined);
          }}
          itemName={editingWeaponProxy.weaponDisplayName}
          showDelete
          onDelete={() => {
            weaponRepo.remove(editingWeaponProxy.id);
            setEditingWeaponProxy(undefined);
          }}
          maxWidth={false}
          fullWidth
        />
      )}
    </>
  );
}
