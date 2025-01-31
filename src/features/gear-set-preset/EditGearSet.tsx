import { useState } from "react";
import { useSnapshot } from "valtio";

import { CardList } from "../../components/common/CardList/CardList";
import { GearSlotCard } from "../../components/gear/GearSlotCard/GearSlotCard";
import { db } from "../../db/reactive-local-storage-db";
import type { GearTypeId } from "../../definitions/gear-types";
import type { CharacterId } from "../../models/character/character-data";
import type { Gear } from "../../models/gear/gear";
import type { GearSet } from "../../models/gear/gear-set";
import { EditGearModal } from "../gear/EditGearModal";
import { SelectGear } from "../gear/SelectGear";

export interface EditGearSetProps {
  gearSetProxy: GearSet;
  characterId: CharacterId;
}

export function EditGearSet({ gearSetProxy, characterId }: EditGearSetProps) {
  const gearSet = useSnapshot(gearSetProxy);

  const [editingGearSlotTypeId, setEditingGearSlotTypeId] = useState<
    GearTypeId | undefined
  >(undefined);
  const [editingGearProxy, setEditingGearProxy] = useState<Gear | undefined>(
    undefined,
  );

  return (
    <>
      <CardList>
        {gearSet.getSlots().map((slot) => (
          <GearSlotCard
            key={slot.acceptsType.id}
            type={slot.acceptsType}
            gear={slot.gear}
            onEdit={() => {
              const gearProxy = gearSetProxy.getSlot(slot.acceptsType.id).gear;
              setEditingGearProxy(gearProxy);
            }}
            onSwap={() => {
              setEditingGearSlotTypeId(slot.acceptsType.id);
            }}
            onRemove={() => {
              gearSetProxy.getSlot(slot.acceptsType.id).gear = undefined;
            }}
          />
        ))}
      </CardList>

      {editingGearProxy && (
        <EditGearModal
          gearProxy={editingGearProxy}
          onClose={() => {
            setEditingGearProxy(undefined);
          }}
          onDelete={() => {
            db.get("gears").remove(editingGearProxy.id);
            setEditingGearProxy(undefined);
          }}
        />
      )}

      {editingGearSlotTypeId && (
        <SelectGear
          characterId={characterId}
          isSelecting={!!editingGearSlotTypeId}
          enforceGearType={editingGearSlotTypeId}
          onSelect={(gearProxy) => {
            gearSetProxy.getSlot(gearProxy.type.id).gear = gearProxy;

            setEditingGearSlotTypeId(undefined);
          }}
          onClose={() => {
            setEditingGearSlotTypeId(undefined);
          }}
        />
      )}
    </>
  );
}
