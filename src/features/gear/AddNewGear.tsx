import { Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { proxy } from "valtio";

import type { ButtonModalProps } from "../../components/common/Modal/ButtonModal";
import { ButtonModal } from "../../components/common/Modal/ButtonModal";
import { GearTypeToggle } from "../../components/gear/GearTypeToggle/GearTypeToggle";
import { db } from "../../db/reactive-local-storage-db";
import type { GearTypeId } from "../../definitions/gear-types";
import { getGearType } from "../../definitions/gear-types";
import type { CharacterId } from "../../models/character/character-data";
import type { GearId } from "../../models/gear/gear";
import { Gear } from "../../models/gear/gear";
import { GearDetailsInline } from "./GearDetailsInline";

export interface AddNewGearProps {
  characterId: CharacterId;
  enforceGearType?: GearTypeId;
  buttonProps?: ButtonModalProps["buttonProps"];
  /** Returns the gear id that has been added to the gear repo */
  onConfirm?(id: GearId): void;
}

/** Creates a new gear, allows edit, then add a new gear to the repo */
export function AddNewGear({
  characterId,
  enforceGearType,
  buttonProps,
  onConfirm,
}: AddNewGearProps) {
  const [gearProxy, setGearProxy] = useState<Gear | undefined>(undefined);

  const createGear = useCallback(
    (gearTypeId: GearTypeId) =>
      proxy(new Gear(getGearType(gearTypeId), characterId)),
    [characterId],
  );

  const clearGearProxy = () => {
    setGearProxy(undefined);
  };

  // If enforceGearType is set, pre-set the gearProxy to new gear of that gear type. Essentially skipping the gear type toggle select.
  useEffect(() => {
    if (
      enforceGearType &&
      (!gearProxy || gearProxy.type.id !== enforceGearType)
    ) {
      setGearProxy(createGear(enforceGearType));
    }
  }, [createGear, enforceGearType, gearProxy]);

  return (
    <ButtonModal
      buttonContent="Add new gear"
      buttonProps={{ variant: "contained", ...buttonProps }}
      modalTitle="Add new gear"
      modalContent={
        <Stack sx={{ gap: 3, alignItems: "center" }}>
          <GearTypeToggle
            values={gearProxy ? [gearProxy.type.id] : []}
            exclusive
            enforceAtLeastOne
            disabled={!!enforceGearType}
            onChange={(gearTypeIds) => {
              if (gearTypeIds[0]) {
                setGearProxy(createGear(gearTypeIds[0]));
              } else {
                clearGearProxy();
              }
            }}
          />
          {gearProxy && <GearDetailsInline gearProxy={gearProxy} />}
        </Stack>
      }
      showConfirm
      showCancel
      isConfirmDisabled={!gearProxy}
      onConfirm={() => {
        if (gearProxy) {
          db.get("gears").add(gearProxy);
          onConfirm?.(gearProxy.id);
        }
      }}
      onClose={() => {
        clearGearProxy();
      }}
      maxWidth={false}
      fullWidth
    />
  );
}
