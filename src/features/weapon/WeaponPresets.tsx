import { Button } from "@mui/material";
import groupBy from "lodash.groupby";
import { useState } from "react";

import { EditorModal } from "../../components/common/Modal/EditorModal";
import { StyledModal } from "../../components/common/Modal/StyledModal";
import { WeaponCard } from "../../components/weapon/WeaponCard/WeaponCard";
import { WeaponDefinitionSelector } from "../../components/weapon/WeaponDefinitionSelector/WeaponDefinitionSelector";
import { db } from "../../db/reactive-local-storage-db";
import type { WeaponName } from "../../definitions/weapons/weapon-definitions";
import {
  getAllWeaponDefinitions,
  getWeaponDefinition,
} from "../../definitions/weapons/weapon-definitions";
import type { CharacterId } from "../../models/character/character-data";
import { WeaponPreset } from "../../models/weapon/weapon-preset";
import { keysOf } from "../../utils/object-utils";
import { InventoryLayout } from "../common/InventoryLayout";
import { useItemsBelongingToCharacter } from "../common/useItemsBelongingToCharacter";
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

  const unusedWeaponDefinitions = getAllWeaponDefinitions().filter(
    (definition) =>
      !items.some(
        (weaponPreset) => weaponPreset.definition.id === definition.id,
      ),
  );

  const [isAddingWeaponPresetGroup, setIsAddingWeaponPresetGroup] =
    useState(false);
  const [editingWeaponDefinitionId, setEditingWeaponDefinitionId] = useState<
    WeaponName | undefined
  >(undefined);

  return (
    <>
      <InventoryLayout
        filter={undefined}
        actions={
          <Button
            variant="contained"
            onClick={() => {
              setIsAddingWeaponPresetGroup(true);
            }}
          >
            Add weapon
          </Button>
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

      {isAddingWeaponPresetGroup && (
        <StyledModal
          modalContent={
            <WeaponDefinitionSelector
              weaponDefinitions={unusedWeaponDefinitions}
              onSelect={(weaponDefinition) => {
                const weaponPreset = new WeaponPreset(
                  characterId,
                  weaponDefinition,
                );
                weaponPresetRepo.add(weaponPreset);

                setIsAddingWeaponPresetGroup(false);
                setEditingWeaponDefinitionId(weaponDefinition.id);
              }}
            />
          }
          open={isAddingWeaponPresetGroup}
          showCancel
          onClose={() => {
            setIsAddingWeaponPresetGroup(false);
          }}
          maxWidth={false}
          fullWidth
        />
      )}

      {editingWeaponDefinitionId && (
        <EditorModal
          modalContent={
            <EditWeaponPresetGroup
              characterId={characterId}
              weaponDefinitionId={editingWeaponDefinitionId}
            />
          }
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
