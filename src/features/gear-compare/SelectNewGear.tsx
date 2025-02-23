import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useProxy } from "valtio/utils";

import { Button } from "../../components/common/Button/Button";
import type { CharacterId } from "../../models/character/character-data";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";
import { AddNewGear } from "../gear/AddNewGear";
import { SelectGear } from "../gear/SelectGear";

export interface SelectNewGearProps {
  characterId: CharacterId;
}

export function SelectNewGear({ characterId }: SelectNewGearProps) {
  const $state = useProxy(gearCompareState);
  const { gearTypeId } = $state;

  const [isSelecting, setIsSelecting] = useState(false);

  return (
    <>
      <Stack direction="row" sx={{ gap: 1, alignItems: "center" }}>
        <AddNewGear
          characterId={characterId}
          enforceGearType={gearTypeId}
          buttonProps={{ variant: "outlined" }}
          onConfirm={(gearProxy) => {
            $state.newGearId = gearProxy.id;
          }}
        />
        <Typography>or</Typography>
        <Button
          onClick={() => {
            setIsSelecting(true);
          }}
        >
          Choose from existing
        </Button>
      </Stack>

      {isSelecting && (
        <SelectGear
          characterId={characterId}
          isSelecting={isSelecting}
          enforceGearType={gearTypeId}
          onSelect={(gearProxy) => {
            $state.newGearId = gearProxy.id;
            setIsSelecting(false);
          }}
          onClose={() => {
            setIsSelecting(false);
          }}
        />
      )}
    </>
  );
}
