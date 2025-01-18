import { Stack } from "@mui/material";
import { useState } from "react";
import { proxy } from "valtio";

import { ButtonModal } from "../../components/common/Modal/ButtonModal";
import { GearTypeToggle } from "../../components/gear/GearTypeToggle/GearTypeToggle";
import { db } from "../../db/reactive-local-storage-db";
import { getGearType } from "../../definitions/gear-types";
import type { CharacterId } from "../../models/character/character-data";
import { Gear } from "../../models/gear/gear";
import { GearEditor } from "./GearEditor";
import { GearOcrModal } from "./GearOcrModal";

export interface AddNewGearProps {
  characterId: CharacterId;
  /** Returns the gear that has been added to the gear repo */
  onConfirm?(gearProxy: Gear): void;
}

/** Creates a new gear, allows edit, then add a new gear to the repo */
export function AddNewGear({ characterId, onConfirm }: AddNewGearProps) {
  const [gearProxy, setGearProxy] = useState<Gear | undefined>(undefined);

  return (
    <ButtonModal
      buttonContent="Add new gear"
      buttonProps={{ variant: "contained" }}
      modalTitle="Add new gear"
      modalContent={
        <Stack sx={{ gap: 3, alignItems: "center" }}>
          <GearOcrModal
            characterId={characterId}
            onFinalizeGear={(gear) => {
              setGearProxy(proxy(gear));
            }}
          />
          <GearTypeToggle
            values={gearProxy ? [gearProxy.type.id] : []}
            exclusive
            enforceAtLeastOne
            onChange={(gearTypes) => {
              if (gearTypes[0]) {
                setGearProxy(
                  proxy(new Gear(getGearType(gearTypes[0]), characterId)),
                );
              } else {
                setGearProxy(undefined);
              }
            }}
          />
          {gearProxy && <GearEditor gearProxy={gearProxy} />}
        </Stack>
      }
      showConfirm
      showCancel
      isConfirmDisabled={!gearProxy}
      onConfirm={() => {
        if (gearProxy) {
          db.get("gears").add(gearProxy);
          onConfirm?.(gearProxy);
        }
      }}
      onClose={() => {
        setGearProxy(undefined);
      }}
      maxWidth={false}
      fullWidth
    />
  );
}
