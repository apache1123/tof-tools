import { useState } from "react";
import { useSnapshot } from "valtio";

import { CardList } from "../../components/common/CardList/CardList";
import { StyledModal } from "../../components/common/Modal/StyledModal";
import { GearSelector } from "../../components/gear/GearSelector/GearSelector";
import { GearSlotCard } from "../../components/gear/GearSlotCard/GearSlotCard";
import { db } from "../../db/reactive-local-storage-db";
import type { GearTypeId } from "../../definitions/gear-types";
import type { CharacterId } from "../../models/character/character-data";
import type { GearSet } from "../../models/gear/gear-set";
import { useItemsBelongingToCharacter } from "../character/useItemsBelongingToCharacter";

export interface GearSetEditorProps {
  gearSetProxy: GearSet;
  characterId: CharacterId;
}

export function GearSetEditor({
  gearSetProxy,
  characterId,
}: GearSetEditorProps) {
  const gearSet = useSnapshot(gearSetProxy);

  const [editingGearSlotTypeId, setEditingGearSlotTypeId] = useState<
    GearTypeId | undefined
  >(undefined);

  const gearsRepo = db.get("gears");
  const { items: allGears } = useItemsBelongingToCharacter(
    gearsRepo,
    characterId,
  );
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
            characterId={characterId}
            gears={filteredGears}
            onSelect={(gearId) => {
              const gearProxy = db.get("gears").find(gearId);
              if (gearProxy) {
                gearSetProxy.getSlot(gearProxy.type.id).gear = gearProxy;
              }

              setEditingGearSlotTypeId(undefined);
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
    </>
  );
}
