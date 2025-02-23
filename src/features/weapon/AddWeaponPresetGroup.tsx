import { useState } from "react";

import { Button } from "../../components/common/Button/Button";
import { StyledModal } from "../../components/common/Modal/StyledModal";
import { WeaponDefinitionSelector } from "../../components/weapon/WeaponDefinitionSelector/WeaponDefinitionSelector";
import { db } from "../../db/reactive-local-storage-db";
import type { WeaponDefinitionId } from "../../definitions/weapons/weapon-definitions";
import { getAllWeaponDefinitions } from "../../definitions/weapons/weapon-definitions";
import type { CharacterId } from "../../models/character/character-data";
import { WeaponPreset } from "../../models/weapon/weapon-preset";
import { useItemsBelongingToCharacter } from "../common/useItemsBelongingToCharacter";

export interface AddWeaponPresetGroupProps {
  characterId: CharacterId;
  buttonText?: string;

  onAdded?(weaponId: WeaponDefinitionId): void;
}

export function AddWeaponPresetGroup({
  characterId,
  onAdded,
  buttonText,
}: AddWeaponPresetGroupProps) {
  const weaponPresetRepo = db.get("weaponPresets");

  const { items } = useItemsBelongingToCharacter(weaponPresetRepo, characterId);

  const unusedWeaponDefinitions = getAllWeaponDefinitions().filter(
    (definition) =>
      !items.some(
        (weaponPreset) => weaponPreset.definition.id === definition.id,
      ),
  );

  const [isAdding, setIsAdding] = useState(false);

  return (
    <>
      <Button
        buttonProps={{
          variant: "contained",
        }}
        onClick={() => {
          setIsAdding(true);
        }}
      >
        {buttonText ?? "Add weapon"}
      </Button>

      {isAdding && (
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

                setIsAdding(false);
                onAdded?.(weaponDefinition.id);
              }}
            />
          }
          modalTitle="Add weapon"
          open={isAdding}
          showCancel
          onClose={() => {
            setIsAdding(false);
          }}
          maxWidth={false}
          fullWidth
        />
      )}
    </>
  );
}
