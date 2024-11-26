import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import type { GearName } from "../../../definitions/gear-types";
import { gearTypesLookup } from "../../../definitions/gear-types";
import { GearTypeIcon } from "../GearTypeIcon/GearTypeIcon";

const gearNames = gearTypesLookup.allIds;

export interface GearTypeToggleProps {
  /** Array of selected gear names. When exclusive is false, this will be one in the array. When exclusive is true, there can be multiple. */
  values: GearName[];
  exclusive?: boolean;
  size?: number;
  /** @param values - Array of selected gear name(s) (or empty array if none). */
  onChange?: (values: GearName[]) => void;
}

export function GearTypeToggle({
  values,
  exclusive,
  size = 35,
  onChange,
}: GearTypeToggleProps) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={exclusive ? values[0] : values}
      exclusive={exclusive}
      onChange={(_, value) => {
        if (onChange)
          onChange(exclusive ? (value === null ? [] : [value]) : value);
      }}
      aria-label="Gear Types"
    >
      {gearNames.map((gearName) => (
        <ToggleButton key={gearName} value={gearName}>
          <GearTypeIcon gearName={gearName} monochromeWhite size={size} />
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
