import { Button, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { useSnapshot } from "valtio";

import { GearTypeSelector } from "../../components/GearTypeSelector/GearTypeSelector";
import type { Gear } from "../../models/gear";
import type { LoadoutsState } from "../../states/loadouts";
import { gearComparerState, loadoutsState } from "../../states/states";
import { GearOCRModal } from "../GearOCRModal";
import { GearPiece } from "../GearPiece";
import { GearValue } from "../GearValue";

export interface LoadoutGearProps {
  gearSnap: Gear;
  gearState: Gear;
}

export function LoadoutGear({ gearSnap, gearState }: LoadoutGearProps) {
  const { selectedLoadout: loadoutSnap } = useSnapshot(
    loadoutsState,
  ) as LoadoutsState;
  const { elementalType } = loadoutSnap;

  const {
    selectedLoadoutItem: {
      loadout: { gearSet: gearSetState },
    },
  } = loadoutsState;

  const gearTypeId = gearSnap.type.id;
  const gearValue = loadoutSnap.getGearValue(gearTypeId);

  const maxTitanGear = gearSnap.getMaxTitanGear(elementalType);
  const maxTitanGearValue = maxTitanGear
    ? loadoutSnap.getSubstituteGearValue(maxTitanGear)
    : undefined;

  const router = useRouter();

  return (
    <>
      <GearPiece
        gearSnap={gearSnap}
        gearState={gearState}
        gearTypeSelector={
          <GearTypeSelector
            selectedGearType={gearSnap.type}
            options={[
              { gearType: gearSnap.type, isTitan: gearSnap.isAugmented },
            ]}
            disabled
          />
        }
        actions={
          <>
            <Tooltip title="Compare this gear in the Gear Comparer">
              <Button
                onClick={() => {
                  // Assumes the `loadoutsState` is shared between here and the gear comparer, so as a result, the selected loadout will be the same for both. Knowing this, we only need to change the selected gear type in the gear comparer to match that of this gear
                  gearComparerState.selectedGearTypeId = gearState.type.id;
                  router.push("/gear-comparer");
                }}
                variant="text"
              >
                Compare
              </Button>
            </Tooltip>
            <GearOCRModal
              onFinalizeGear={(gearFromOCR) => {
                if (gearFromOCR.type.id === gearTypeId) {
                  gearSetState.setGear(gearFromOCR);
                }
              }}
              enforceGearType={gearSnap.type.id}
            />
          </>
        }
        showTitanToggle
        showStatSummary={loadoutSnap.elementalType}
        showMaxTitanGear={{ maxTitanGear }}
        data-testid={gearTypeId}
      />
      <GearValue
        gearValue={gearValue}
        data-testid={gearTypeId}
        titanGearValue={maxTitanGearValue}
      />
    </>
  );
}
