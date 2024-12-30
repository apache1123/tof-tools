import { useState } from "react";
import { useSnapshot } from "valtio";

import { CardList } from "../../components/common/CardList/CardList";
import { StyledModal } from "../../components/common/Modal/StyledModal";
import { GearSelector } from "../../components/gear/GearSelector/GearSelector";
import { GearSlotCard } from "../../components/gear/GearSlotCard/GearSlotCard";
import { db } from "../../db/reactive-local-storage-db";
import type { GearTypeId } from "../../definitions/gear-types";
import type { CharacterId } from "../../models/character/character";
import type { Gear } from "../../models/gear/gear";
import type { GearSet } from "../../models/gear/gear-set";
import { NewGearEditor } from "../gear/NewGearEditor";
import { useGears } from "../gear/useGears";

export interface GearSetEditorProps {
  gearSetProxy: GearSet;
  characterId: CharacterId;
  onAddGear(gear: Gear): void;
}

export function GearSetEditor({
  gearSetProxy,
  characterId,
  onAddGear,
}: GearSetEditorProps) {
  const gearSet = useSnapshot(gearSetProxy);

  const [editingGearSlotTypeId, setEditingGearSlotTypeId] = useState<
    GearTypeId | undefined
  >(undefined);
  const [isAddingGear, setIsAddingGear] = useState(false);

  const allGears = useGears(characterId);
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

      <StyledModal
        modalContent={
          <GearSelector
            gears={filteredGears}
            onSelect={(gearId) => {
              const gearProxy = db.get("gears").find(gearId);
              if (gearProxy) {
                gearSetProxy.getSlot(gearProxy.type.id).gear = gearProxy;
              }

              setEditingGearSlotTypeId(undefined);
            }}
            onAdd={() => {
              setIsAddingGear(true);
            }}
          />
        }
        open={!!editingGearSlotTypeId}
        showCancel
        onClose={() => {
          setEditingGearSlotTypeId(undefined);
        }}
        maxWidth={false}
        fullWidth
      />

      <NewGearEditor
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
