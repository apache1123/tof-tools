import { Card, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useProxy } from "valtio/utils";

import { Button } from "../../components/common/Button/Button";
import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character-data";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";
import { useItemsBelongingToCharacter } from "../character/useItemsBelongingToCharacter";
import { AddNewGear } from "../gear/AddNewGear";
import { GearEditor } from "../gear/GearEditor";
import { SelectGear } from "../gear/SelectGear";

export interface NewGearProps {
  characterId: CharacterId;
}

export function NewGear({ characterId }: NewGearProps) {
  const $state = useProxy(gearCompareState);
  const { gearTypeId, newGearId } = $state;

  const { itemProxies } = useItemsBelongingToCharacter(
    db.get("gears"),
    characterId,
  );
  const gearProxy = itemProxies.find((gearProxy) => gearProxy.id === newGearId);

  const [isSelecting, setIsSelecting] = useState(false);

  return (
    <>
      <Stack direction="row" sx={{ mb: 2, gap: 1, alignItems: "center" }}>
        <Typography variant="h5">New gear to compare</Typography>
        {gearProxy && (
          <Button
            onClick={() => {
              $state.newGearId = undefined;
            }}
          >
            Clear
          </Button>
        )}
      </Stack>

      {gearProxy ? (
        <Card elevation={1} sx={{ p: 2 }}>
          <GearEditor gearProxy={gearProxy} />
        </Card>
      ) : (
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
      )}

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
