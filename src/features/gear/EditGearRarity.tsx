import { useState } from "react";
import { useSnapshot } from "valtio";

import { StyledModal } from "../../components/common/Modal/StyledModal";
import { GearRarityToggle } from "../../components/gear/GearRarityToggle/GearRarityToggle";
import type { Gear } from "../../models/gear/gear";
import type { GearRarity } from "../../models/gear/gear-rarity";

export interface EditGearRarityProps {
  gearProxy: Gear;
}

interface RarityChange {
  from: GearRarity;
  to: GearRarity;
}

export function EditGearRarity({ gearProxy }: EditGearRarityProps) {
  const gear = useSnapshot(gearProxy) as Gear;
  const { rarity } = gear;

  const [augmentResetConfirm, setAugmentResetConfirm] = useState<{
    show: boolean;
    rarityChange?: RarityChange;
  }>({ show: false });

  const performRarityChange = (rarityChange: RarityChange) => {
    gearProxy.rarity = rarityChange.to;
  };

  return (
    <>
      <GearRarityToggle
        value={rarity}
        onChange={(value) => {
          const rarityChange: RarityChange = {
            from: gearProxy.rarity,
            to: value,
          };

          if (
            gearProxy.rarity !== "SSR" &&
            value === "SSR" &&
            gearProxy.hasAnyAugmentValues
          ) {
            setAugmentResetConfirm({ show: true, rarityChange });
            return;
          }

          performRarityChange(rarityChange);
        }}
      />

      {augmentResetConfirm.show && augmentResetConfirm.rarityChange && (
        <StyledModal
          open={augmentResetConfirm.show}
          modalContent={`Changing this gear from ${augmentResetConfirm.rarityChange.from} to ${augmentResetConfirm.rarityChange.to} will reset the augmentation value of all random stats to 0, and remove all augmentation stats. Are you sure you want to continue?`}
          showConfirm
          onConfirm={() => {
            if (augmentResetConfirm.rarityChange) {
              performRarityChange(augmentResetConfirm.rarityChange);
            }
            setAugmentResetConfirm({ show: false });
          }}
          showCancel
          onClose={() => {
            setAugmentResetConfirm({ show: false });
          }}
        />
      )}
    </>
  );
}
