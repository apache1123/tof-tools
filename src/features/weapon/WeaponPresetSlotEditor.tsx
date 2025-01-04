import { useState } from "react";
import { useSnapshot } from "valtio";

import { StyledModal } from "../../components/common/Modal/StyledModal";
import { WeaponPresetSelector } from "../../components/weapon/WeaponPresetSelector/WeaponPresetSelector";
import { WeaponPresetSlotCard } from "../../components/weapon/WeaponPresetSlotCard/WeaponPresetSlotCard";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";
import type { WeaponPresetSlot } from "../../models/weapon/weapon-preset-slot";

export interface WeaponPresetSlotEditorProps {
  weaponPresetSlotProxy: WeaponPresetSlot;
  characterId: CharacterId;
}

export function WeaponPresetSlotEditor({
  weaponPresetSlotProxy,
  characterId,
}: WeaponPresetSlotEditorProps) {
  const { weaponPreset } = useSnapshot(
    weaponPresetSlotProxy,
  ) as WeaponPresetSlot;

  const weaponPresets = useSnapshot(db.get("weaponPresets")).filter(
    (weaponPreset) => weaponPreset.weapon.characterId === characterId,
  );

  const [isAddingWeaponPreset, setIsAddingWeaponPreset] = useState(false);

  return (
    <>
      <WeaponPresetSlotCard
        weaponPreset={weaponPreset}
        onClick={() => {
          setIsAddingWeaponPreset(true);
        }}
        onRemove={() => {
          weaponPresetSlotProxy.weaponPreset = undefined;
        }}
      />

      <StyledModal
        modalContent={
          <WeaponPresetSelector
            weaponPresets={weaponPresets}
            onSelect={(id) => {
              const weaponPresetProxy = db.get("weaponPresets").find(id);
              if (!weaponPresetProxy)
                throw new Error("Weapon preset not found");

              weaponPresetSlotProxy.weaponPreset = weaponPresetProxy;

              setIsAddingWeaponPreset(false);
            }}
          />
        }
        open={isAddingWeaponPreset}
        onClose={() => {
          setIsAddingWeaponPreset(false);
        }}
        showCancel
        maxWidth={false}
        fullWidth
      />
    </>
  );
}
