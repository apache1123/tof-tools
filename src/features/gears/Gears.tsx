import { Button } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio";

import { EditorModal } from "../../components/common/Modal/EditorModal";
import { GearCard } from "../../components/gear/GearCard/GearCard";
import { GearFilter } from "../../components/gear/GearFilter/GearFilter";
import { db } from "../../db/reactive-local-storage-db";
import type { Gear } from "../../models/gear/gear";
import type { GearState } from "../../states/gear/gear-state";
import { gearState } from "../../states/gear/gear-state";
import { useSelectedCharacter } from "../characters/useSelectedCharacter";
import { FilterLayout } from "../common/FilterLayout";
import { InventoryLayout } from "../common/InventoryLayout";
import { GearEditor } from "./GearEditor";
import { NewGearEditorModal } from "./NewGearEditorModal";

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
          items={filteredGears.map((gear) => (
            <GearCard
              key={gear.id}
              gear={gear}
              onClick={() => {
                const gearProxy = gearRepoProxy.find(gear.id);
                if (gearProxy) {
                  setEditingGear(gearProxy);
                }
              }}
            />
          ))}
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
          <EditorModal
            open={!!editingGear}
            modalContent={<GearEditor gearProxy={editingGear} />}
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
