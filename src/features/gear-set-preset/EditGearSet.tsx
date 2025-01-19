import { useState } from "react";
import { useSnapshot } from "valtio";

import { CardList } from "../../components/common/CardList/CardList";
import { GearSlotCard } from "../../components/gear/GearSlotCard/GearSlotCard";
import type { GearTypeId } from "../../definitions/gear-types";
import type { CharacterId } from "../../models/character/character-data";
import type { GearSet } from "../../models/gear/gear-set";
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
