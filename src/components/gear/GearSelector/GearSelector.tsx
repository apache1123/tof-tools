import { InventoryLayout } from "../../../features/common/InventoryLayout";
import { AddNewGear } from "../../../features/gear/AddNewGear";
import type { CharacterId } from "../../../models/character/character-data";
import type { Gear, GearId } from "../../../models/gear/gear";
import { GearCard } from "../GearCard/GearCard";

export interface GearSelectorProps {
  characterId: CharacterId;
  gears: Gear[];
  onSelect(gearId: GearId): void;
}

export function GearSelector({
  characterId,
  gears,
  onSelect,
}: GearSelectorProps) {
  return (
    <InventoryLayout
      filter={undefined}
      actions={<AddNewGear characterId={characterId} />}
      items={gears.map((gear) => (
        <GearCard key={gear.id} gear={gear} onClick={() => onSelect(gear.id)} />
      ))}
    />
  );
}
