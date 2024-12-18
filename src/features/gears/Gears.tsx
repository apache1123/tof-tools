import { Button } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio";

import { GearEditorModal } from "../../components/mutational/gear/GearEditorModal/GearEditorModal";
import { NewGearEditorModal } from "../../components/mutational/gear/NewGearEditorModal/NewGearEditorModal";
import { GearFilter } from "../../components/presentational/gear/GearFilter/GearFilter";
import { GearList } from "../../components/presentational/gear/GearList/GearList";
import { db } from "../../db/reactive-local-storage-db";
import type { Gear } from "../../models/gear/gear";
import type { GearState } from "../../states/gear/gear-state";
import { gearState } from "../../states/gear/gear-state";
import { useSelectedCharacter } from "../characters/useSelectedCharacter";
import { FilterLayout } from "../common/FilterLayout";
import { InventoryLayout } from "../common/InventoryLayout";

export function Gears() {
  const { selectedCharacterId } = useSelectedCharacter();

  const gearRepoProxy = db.get("gears");
  const gearRepo = useSnapshot(gearRepoProxy);

  const gearsSnap = useSnapshot(gearState) as GearState;
  const { filter } = gearsSnap;

  const filteredGears = gearRepo.filter((gear) => {
    if (gear.characterId !== selectedCharacterId) return false;

    const { gearTypeIds } = filter;
    if (gearTypeIds.length) {
      return gearTypeIds.includes(gear.type.id);
    }

    return true;
  });

  const [isAddingNewGear, setIsAddingNewGear] = useState(false);
  const [editingGear, setEditingGear] = useState<Gear | undefined>(undefined);

  return (
    selectedCharacterId && (
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
          items={
            <GearList
              gears={filteredGears}
              onClick={(id) => {
                const gearProxy = gearRepoProxy.find(id);
                if (gearProxy) {
                  setEditingGear(gearProxy);
                }
              }}
            />
          }
        />

        <NewGearEditorModal
          characterId={selectedCharacterId}
          open={isAddingNewGear}
          onConfirm={(gear) => {
            gearRepoProxy.add(gear);
            setIsAddingNewGear(false);
          }}
          onCancel={() => {
            setIsAddingNewGear(false);
          }}
        />

        {editingGear && (
          <GearEditorModal
            open={!!editingGear}
            gearProxy={editingGear}
            itemName={editingGear.type.displayName}
            onClose={() => {
              setEditingGear(undefined);
            }}
            showDelete
            onDelete={() => {
              gearRepoProxy.remove(editingGear.id);
              setEditingGear(undefined);
            }}
          />
        )}
      </>
    )
  );
}
