import type { GearTypeId } from "../../../definitions/gear-types";
import { InventoryLayout } from "../../../features/common/InventoryLayout";
import { AddNewGear } from "../../../features/gear/AddNewGear";
import type { CharacterId } from "../../../models/character/character-data";
import type { Gear } from "../../../models/gear/gear";
import { GearCard } from "../GearCard/GearCard";

export interface GearSelectorProps {
  characterId: CharacterId;
  gears: Gear[];
  /** Filter out gears that don't match the given gear type. */
  enforceGearType?: GearTypeId;
  onSelect(gear: Gear): void;
}

export function GearSelector({
  characterId,
  gears,
  enforceGearType,
  onSelect,
}: GearSelectorProps) {
  const filteredGears = enforceGearType
    ? gears.filter((gear) => gear.type.id === enforceGearType)
    : gears;

  return (
    <InventoryLayout
      filter={undefined}
      actions={
        <AddNewGear
          characterId={characterId}
          enforceGearType={enforceGearType}
        />
      }
      items={filteredGears.map((gear) => (
        <GearCard key={gear.id} gear={gear} onClick={() => onSelect(gear)} />
      ))}
    />
  );
}
