import { Stack } from "@mui/material";
import { useProxy } from "valtio/utils";

import { SectionSubheading } from "../../components/common/SectionHeading/SectionSubheading";
import { GearTypeToggle } from "../../components/gear/GearTypeToggle/GearTypeToggle";
import { gearCompareState } from "../../states/gear-compare/gear-compare-state";

export function SelectGearType() {
  const $state = useProxy(gearCompareState);
  const { gearTypeId } = $state;

  return (
    <Stack sx={{ gap: 0.5 }}>
      <SectionSubheading>Select gear type</SectionSubheading>
      <GearTypeToggle
        values={gearTypeId ? [gearTypeId] : []}
        exclusive
        enforceAtLeastOne
        onChange={(gearTypeIds) => {
          $state.gearTypeId = gearTypeIds[0];
        }}
      />
    </Stack>
  );
}
