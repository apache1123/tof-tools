import { Button } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio";

import { EditorModal } from "../../components/common/Modal/EditorModal";
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
import { GearEditor } from "./GearEditor";
import { NewGearEditor } from "./NewGearEditor";
import { useGears } from "./useGears";

export interface GearsProps {
  characterId: CharacterId;
}

export function Gears({ characterId }: GearsProps) {
  const gearRepo = db.get("gears");

  const gearsSnap = useSnapshot(gearState) as GearState;
  const { filter } = gearsSnap;

  const gears = useGears(characterId);
  const filteredGears = getFilteredGears(gears, filter);

  const [isAddingNewGear, setIsAddingNewGear] = useState(false);
  const [editingGear, setEditingGear] = useState<Gear | undefined>(undefined);

  return (
    <>
      <InventoryLayout
        filter={
          <FilterLayout
            title="Gear Filter"
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
        actions={
          <Button
            variant="contained"
            onClick={() => {
              setIsAddingNewGear(true);
            }}
          >
            Add new gear
          </Button>
        }
        items={filteredGears.map((gear) => (
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

      <NewGearEditor
        characterId={characterId}
        open={isAddingNewGear}
        onConfirm={(gear) => {
          gearRepo.add(gear);
          setIsAddingNewGear(false);
        }}
        onCancel={() => {
          setIsAddingNewGear(false);
        }}
      />

      {editingGear && (
        <EditorModal
          open={!!editingGear}
          modalContent={<GearEditor gearProxy={editingGear} />}
          itemName={editingGear.type.displayName}
          onClose={() => {
            setEditingGear(undefined);
          }}
          showDelete
          onDelete={() => {
            gearRepo.remove(editingGear.id);
            setEditingGear(undefined);
          }}
        />
      )}
    </>
  );
}
