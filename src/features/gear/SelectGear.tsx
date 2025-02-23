import { StyledModal } from "../../components/common/Modal/StyledModal";
import { GearSelector } from "../../components/gear/GearSelector/GearSelector";
import { db } from "../../db/reactive-local-storage-db";
import type { GearTypeId } from "../../definitions/gear-types";
import { getGearType } from "../../definitions/gear-types";
import type { CharacterId } from "../../models/character/character-data";
import type { Gear } from "../../models/gear/gear";
import { useItemsBelongingToCharacter } from "../common/useItemsBelongingToCharacter";

export interface SelectGearProps {
  characterId: CharacterId;
  isSelecting: boolean;
  enforceGearType?: GearTypeId;
  onSelect(gearProxy: Gear): void;
  onClose(): void;
}

export function SelectGear({
  characterId,
  isSelecting,
  enforceGearType,
  onSelect,
  onClose,
}: SelectGearProps) {
  const { itemProxies, items } = useItemsBelongingToCharacter(
    db.get("gears"),
    characterId,
  );

  return (
    <StyledModal
      modalContent={
        <GearSelector
          characterId={characterId}
          gears={items}
          enforceGearType={enforceGearType}
          onSelect={(gear) => {
            const gearProxy = itemProxies.find(
              (gearProxy) => gearProxy.id === gear.id,
            );

            if (gearProxy) onSelect(gearProxy);
          }}
        />
      }
      modalTitle={
        enforceGearType
          ? `Select ${getGearType(enforceGearType).displayName}`
          : "Select gear"
      }
      open={isSelecting}
      showCancel
      onClose={onClose}
      maxWidth={false}
      fullWidth
    />
  );
}
