import { useState } from "react";
import { useSnapshot } from "valtio";

import { StyledModal } from "../../components/common/Modal/StyledModal";
import { WeaponPresetSelector } from "../../components/weapon/WeaponPresetSelector/WeaponPresetSelector";
import { WeaponPresetSlotCard } from "../../components/weapon/WeaponPresetSlotCard/WeaponPresetSlotCard";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";
import type { WeaponPreset } from "../../models/weapon/weapon-preset";

export interface EditTeamPresetWeaponProps {
  weaponPreset: WeaponPreset | undefined;
  characterId: CharacterId;
  disabled?: boolean;
  showSetAsMainButton?: boolean;
  onEdit(): void;
  onSwap(weaponPresetProxy: WeaponPreset): void;
  onRemove(): void;
  onSetAsMain?(): void;
}

export function EditTeamPresetWeapon({
  weaponPreset,
  characterId,
  disabled,
  showSetAsMainButton,
  onEdit,
  onSwap,
  onRemove,
  onSetAsMain,
}: EditTeamPresetWeaponProps) {
  const weaponPresets = useSnapshot(db.get("weaponPresets")).filter(
    (weaponPreset) => weaponPreset.characterId === characterId,
  );

  const [isAddingWeaponPreset, setIsAddingWeaponPreset] = useState(false);

  return (
    <>
      <WeaponPresetSlotCard
        weaponPreset={weaponPreset}
        disabled={disabled}
        showSetAsMainButton={showSetAsMainButton}
        onEdit={onEdit}
        onSwap={() => {
          setIsAddingWeaponPreset(true);
        }}
        onRemove={onRemove}
        onSetAsMain={onSetAsMain}
      />

      <StyledModal
        modalContent={
          <WeaponPresetSelector
            weaponPresets={weaponPresets}
            onSelect={(id) => {
              const weaponPresetProxy = db.get("weaponPresets").find(id);
              if (!weaponPresetProxy)
                throw new Error("Weapon preset not found");

              onSwap(weaponPresetProxy);

              setIsAddingWeaponPreset(false);
            }}
          />
        }
        modalTitle="Select weapon preset"
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
