import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio";

import { NewGearEditorModal } from "../../components/mutational/NewGearEditorModal/NewGearEditorModal";
import { GearFilter } from "../../components/presentational/GearFilter/GearFilter";
import { GearList } from "../../components/presentational/GearList/GearList";
import type { GearsState } from "../../states/gears/gears-state";
import { charactersState, gearsState } from "../../states/states";

export function Gears() {
  const { selected: selectedCharacter } = useSnapshot(charactersState);
  const gearsSnap = useSnapshot(gearsState) as GearsState;
  const { filter } = gearsSnap;

  const [isAddingNewGear, setIsAddingNewGear] = useState(false);

  return (
    selectedCharacter && (
      <>
        <Stack sx={{ gap: 2 }}>
          <GearFilter
            filter={filter}
            onChange={(filter) => {
              gearsState.filter = filter;
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              setIsAddingNewGear(true);
            }}
          >
            Add new gear
          </Button>

          <GearList gears={gearsSnap.displayedGears()} />
        </Stack>

        <NewGearEditorModal
          characterId={selectedCharacter.id}
          open={isAddingNewGear}
          onConfirm={(gear) => {
            gearsState.add(gear);
            setIsAddingNewGear(false);
          }}
          onCancel={() => {
            setIsAddingNewGear(false);
          }}
        />
      </>
    )
  );
}
