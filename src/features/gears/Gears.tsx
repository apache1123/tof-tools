import { Button, Paper } from "@mui/material";
import { useState } from "react";
import { useSnapshot } from "valtio";

import { NewGearEditorModal } from "../../components/mutational/NewGearEditorModal/NewGearEditorModal";
import { GearList } from "../../components/presentational/GearList/GearList";
import { charactersState, gearsState } from "../../states/states";

export function Gears() {
  const { selected: selectedCharacter } = useSnapshot(charactersState);
  const gearsSnap = useSnapshot(gearsState);

  const [isAddingNewGear, setIsAddingNewGear] = useState(false);

  return (
    selectedCharacter && (
      <Paper>
        <>
          <Button
            variant="contained"
            onClick={() => {
              setIsAddingNewGear(true);
            }}
          >
            Add new gear
          </Button>
          <GearList gears={gearsSnap.displayedGears()} />
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
      </Paper>
    )
  );
}
