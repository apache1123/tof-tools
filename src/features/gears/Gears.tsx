import { Button } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio";

import { GearEditorModal } from "../../components/mutational/gear/GearEditorModal/GearEditorModal";
import { NewGearEditorModal } from "../../components/mutational/gear/NewGearEditorModal/NewGearEditorModal";
import { GearFilter } from "../../components/presentational/gear/GearFilter/GearFilter";
import { GearList } from "../../components/presentational/gear/GearList/GearList";
import type { Gear } from "../../models/gear/gear";
import type { GearsState } from "../../states/gears/gears-state";
import { gearsState } from "../../states/states";
import { useSelectedCharacter } from "../characters/useSelectedCharacter";
import { FilterLayout } from "../common/FilterLayout";
import { InventoryLayout } from "../common/InventoryLayout";

export function Gears() {
  const { selectedCharacterSnap } = useSelectedCharacter();

  const gearsSnap = useSnapshot(gearsState) as GearsState;
  const { filter } = gearsSnap;

  const [isAddingNewGear, setIsAddingNewGear] = useState(false);
  const [editingGear, setEditingGear] = useState<Gear | undefined>(undefined);

  return (
    selectedCharacterSnap && (
      <>
        <InventoryLayout
          filter={
            <FilterLayout
              title="Gear Filter"
              filterContent={
                <GearFilter
                  filter={filter}
                  onChange={(filter) => {
                    gearsState.filter = filter;
                  }}
                />
              }
              onResetFilter={() => {
                gearsState.resetFilter();
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
              gears={gearsSnap.getFilteredGears()}
              onClick={(id) => {
                const gearState = gearsState.find(id);
                if (gearState) {
                  setEditingGear(gearState);
                }
              }}
            />
          }
        />

        <NewGearEditorModal
          characterId={selectedCharacterSnap.id}
          open={isAddingNewGear}
          onConfirm={(gear) => {
            gearsState.add(gear);
            setIsAddingNewGear(false);
          }}
          onCancel={() => {
            setIsAddingNewGear(false);
          }}
        />

        {editingGear && (
          <GearEditorModal
            open={!!editingGear}
            gearState={editingGear}
            onClose={() => {
              setEditingGear(undefined);
            }}
          />
        )}
      </>
    )
  );
}
