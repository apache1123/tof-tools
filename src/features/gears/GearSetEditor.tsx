import { useState } from "react";
import { useSnapshot } from "valtio";

import { CardList } from "../../components/common/CardList/CardList";
import { GearSelectorModal } from "../../components/gear/GearSelectorModal/GearSelectorModal";
import { GearSlotCard } from "../../components/gear/GearSlotCard/GearSlotCard";
import type { GearTypeId } from "../../definitions/gear-types";
import type { CharacterId } from "../../models/character/character";
import type { Gear } from "../../models/gear/gear";
import type { GearSet } from "../../models/gear/gear-set";
import { NewGearEditorModal } from "./NewGearEditorModal";

export interface GearSetEditorProps {
  gearSetProxy: GearSet;
  allGearsProxy: Gear[];
  characterId: CharacterId;
  onAddGear(gear: Gear): void;
}

export function GearSetEditor({
  gearSetProxy,
  allGearsProxy,
  characterId,
  onAddGear,
}: GearSetEditorProps) {
  const gearSet = useSnapshot(gearSetProxy);

  const [editingGearSlotTypeId, setEditingGearSlotTypeId] = useState<
    GearTypeId | undefined
  >(undefined);
  const [isAddingGear, setIsAddingGear] = useState(false);

  const allGears = useSnapshot(allGearsProxy) as Gear[];
  const filteredGears = editingGearSlotTypeId
    ? allGears.filter((gear) => gear.type.id === editingGearSlotTypeId)
    : [];

  return (
    <>
      <CardList>
        {gearSet.getSlots().map((slot) => (
          <GearSlotCard
            key={slot.acceptsType.id}
            type={slot.acceptsType}
            gear={slot.gear}
            onClick={() => {
              setEditingGearSlotTypeId(slot.acceptsType.id);
            }}
          />
        ))}
      </CardList>

      <GearSelectorModal
        open={!!editingGearSlotTypeId}
        gears={filteredGears}
        onSelect={(gearId) => {
          const gearProxy = allGearsProxy.find((gear) => gear.id === gearId);
          if (gearProxy) {
            gearSetProxy.getSlot(gearProxy.type.id).gear = gearProxy;
          }

          setEditingGearSlotTypeId(undefined);
        }}
        onAdd={() => {
          setIsAddingGear(true);
        }}
        onClose={() => {
          setEditingGearSlotTypeId(undefined);
        }}
      />

      <NewGearEditorModal
        characterId={characterId}
        open={isAddingGear}
        onConfirm={(gear) => {
          onAddGear(gear);
          setIsAddingGear(false);
        }}
        onCancel={() => {
          setIsAddingGear(false);
        }}
      />
    </>
  );
}
