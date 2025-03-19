import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { useProxy } from "valtio/utils";

import { Button } from "../../components/common/Button/Button";
import { StyledModal } from "../../components/common/Modal/StyledModal";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";
import { EditCharacterPresetOverrideStats } from "../character-preset/EditCharacterPreset/EditCharacterPresetOverrideStats";
import { useCharacterPreset } from "./hooks/useCharacterPreset";
import { useCurrentGear } from "./hooks/useCurrentGear";
import { useNewGear } from "./hooks/useNewGear";

export function SwapCurrentAndNewGear() {
  const { characterPreset, characterPresetProxy } = useCharacterPreset();
  const { currentGear, currentGearProxy } = useCurrentGear();
  const { newGear, newGearProxy } = useNewGear();

  const { gearTypeId } = useProxy(gearCompareState);

  const [openConfirmation, setOpenConfirmation] = useState(false);

  return (
    characterPreset &&
    characterPresetProxy &&
    currentGear &&
    newGear &&
    gearTypeId && (
      <>
        <Button
          buttonProps={{ size: "small" }}
          onClick={() => {
            if (characterPresetProxy && currentGearProxy && newGearProxy) {
              const gearSlot =
                characterPresetProxy.gearSetPreset?.gearSet.getSlot(gearTypeId);

              if (gearSlot) {
                gearSlot.gear = newGearProxy;
                gearCompareState.newGearId = currentGearProxy.id;

                setOpenConfirmation(true);
              }
            }
          }}
        >
          Swap with current gear
        </Button>

        {openConfirmation && (
          <StyledModal
            open={openConfirmation}
            modalContent={
              <>
                <Typography gutterBottom>
                  Swapped the current gear in the preset with the new gear.
                </Typography>
                <Typography
                  sx={{ color: (theme) => theme.palette.warning.main }}
                  gutterBottom
                >
                  Update the preset stats below using your new stats shown
                  in-game with the swapped gear.
                </Typography>

                <Grid container spacing={2} sx={{ mt: 4 }}>
                  <EditCharacterPresetOverrideStats
                    characterPresetProxy={characterPresetProxy}
                  />
                </Grid>
              </>
            }
            onClose={() => setOpenConfirmation(false)}
            maxWidth={"lg"}
          />
        )}
      </>
    )
  );
}
