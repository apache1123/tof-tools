import groupBy from "lodash.groupby";
import { useState } from "react";

import { EditorModal } from "../../components/common/Modal/EditorModal";
import { WeaponCard } from "../../components/weapon/WeaponCard/WeaponCard";
import { db } from "../../db/reactive-local-storage-db";
import type { WeaponDefinitionId } from "../../definitions/weapons/weapon-definitions";
import { getWeaponDefinition } from "../../definitions/weapons/weapon-definitions";
import type { CharacterId } from "../../models/character/character-data";
import { keysOf } from "../../utils/object-utils";
import { InventoryLayout } from "../common/InventoryLayout";
import { useItemsBelongingToCharacter } from "../common/useItemsBelongingToCharacter";
import { AddWeaponPresetGroup } from "./AddWeaponPresetGroup";
import { EditWeaponPresetGroup } from "./EditWeaponPresetGroup";

export interface WeaponPresetsProps {
  characterId: CharacterId;
}

export function WeaponPresets({ characterId }: WeaponPresetsProps) {
  const weaponPresetRepo = db.get("weaponPresets");

  const { items } = useItemsBelongingToCharacter(weaponPresetRepo, characterId);
  const weaponPresetsByDefinitionId = groupBy(
    items,
    (weaponPreset) => weaponPreset.definition.id,
  );
  const weaponPresetGroups = keysOf(weaponPresetsByDefinitionId).map(
    (definitionId) => {
      const weaponDefinition = items.find(
        (weaponPreset) => weaponPreset.definition.id === definitionId,
      )!.definition;

      return {
        weaponDefinition,
        weaponPresets: weaponPresetsByDefinitionId[definitionId],
      };
    },
  );

  const [editingWeaponDefinitionId, setEditingWeaponDefinitionId] = useState<
    WeaponDefinitionId | undefined
  >(undefined);

  return (
    <>
      <InventoryLayout
        filter={undefined}
        actions={
          <AddWeaponPresetGroup
            characterId={characterId}
            onAdded={(weaponDefinitionId) => {
              setEditingWeaponDefinitionId(weaponDefinitionId);
            }}
          />
        }
        items={weaponPresetGroups.map((weaponPresetGroup) => {
          const definition = weaponPresetGroup.weaponDefinition;
          // Use the weapon stars of the first preset. Assuming all presets are set to the same weapon stars.
          const stars = weaponPresetGroup.weaponPresets[0]?.stars;

          return (
            <WeaponCard
              key={definition.id}
              definition={definition}
              stars={stars}
              onClick={() => {
                setEditingWeaponDefinitionId(definition.id);
              }}
              sx={{ width: 300 }}
            />
          );
        })}
      />

      {editingWeaponDefinitionId && (
        <EditorModal
          modalContent={
            <EditWeaponPresetGroup
              characterId={characterId}
              weaponDefinitionId={editingWeaponDefinitionId}
            />
          }
          modalTitle="Edit weapon & presets"
          open={!!editingWeaponDefinitionId}
          onClose={() => {
            setEditingWeaponDefinitionId(undefined);
          }}
          itemName={
            getWeaponDefinition(editingWeaponDefinitionId).weaponDisplayName
          }
          showDelete
          onDelete={() => {
            // Remove all weapon presets with the weapon definition belonging to the character
            weaponPresetRepo
              .filter(
                (weaponPreset) =>
                  weaponPreset.characterId === characterId &&
                  weaponPreset.definition.id === editingWeaponDefinitionId,
              )
              .forEach((weaponPreset) => {
                weaponPresetRepo.remove(weaponPreset.id);
              });

            setEditingWeaponDefinitionId(undefined);
          }}
          maxWidth={false}
          fullWidth
        />
      )}
    </>
  );
}
