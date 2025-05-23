import { useState } from "react";
import { useSnapshot } from "valtio";

import { GearCard } from "../../components/gear/GearCard/GearCard";
import { GearFilter } from "../../components/gear/GearFilter/GearFilter";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";
import type { Gear } from "../../models/gear/gear";
import { getFilteredGears } from "../../states/gear/gear-filter";
import type { GearState } from "../../states/gear/gear-state";
import { gearState } from "../../states/gear/gear-state";
import { FilterLayout } from "../common/FilterLayout";
import { InventoryLayout } from "../common/InventoryLayout";
import { useItemsBelongingToCharacter } from "../common/useItemsBelongingToCharacter";
import { AddNewGear } from "./AddNewGear";
import { GearDetailsModal } from "./GearDetailsModal";

export interface GearsProps {
  characterId: CharacterId;
}

export function Gears({ characterId }: GearsProps) {
  const gearRepo = db.get("gears");

  const gearsSnap = useSnapshot(gearState) as GearState;
  const { filter } = gearsSnap;

  const { items } = useItemsBelongingToCharacter(gearRepo, characterId);
  const filteredItems = getFilteredGears(items, filter);

  const [editingGear, setEditingGear] = useState<Gear | undefined>(undefined);

  return (
    <>
      <InventoryLayout
        filter={
          <FilterLayout
            filterContent={
              <GearFilter
                filter={filter}
                onChange={(filter) => {
                  gearState.filter = filter;
                }}
              />
            }
            onResetFilter={() => {
              gearState.resetFilter();
            }}
          />
        }
        actions={<AddNewGear characterId={characterId} />}
        items={filteredItems.map((gear) => (
          <GearCard
            key={gear.id}
            gear={gear}
            onClick={() => {
              const gearProxy = gearRepo.find(gear.id);
              if (gearProxy) {
                setEditingGear(gearProxy);
              }
            }}
          />
        ))}
      />

      {editingGear && (
        <GearDetailsModal
          gearProxy={editingGear}
          onClose={() => {
            setEditingGear(undefined);
          }}
          onDelete={() => {
            gearRepo.remove(editingGear.id);
            setEditingGear(undefined);
          }}
        />
      )}
    </>
  );
}
