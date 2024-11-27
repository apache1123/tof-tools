import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import type { GearName } from "../../../definitions/gear-types";
import { gearTypesLookup } from "../../../definitions/gear-types";
import { GearTypeIcon } from "../GearTypeIcon/GearTypeIcon";

const gearNames = gearTypesLookup.allIds;

export interface GearTypeToggleProps {
  /** Array of selected gear names. When exclusive is false, this will be one in the array. When exclusive is true, there can be multiple. */
  values: GearName[];
  exclusive?: boolean;
  /** Enforce at least one gear type to be selected (except at initial state) i.e. cannot deselect all gear types. */
  enforceAtLeastOne?: boolean;
  size?: number;
  /** @param values - Array of selected gear name(s) (or empty array if none). */
  onChange?: (values: GearName[]) => void;
}

export function GearTypeToggle({
  values,
  exclusive,
  enforceAtLeastOne,
  size = 35,
  onChange,
}: GearTypeToggleProps) {
  return (
    <ToggleButtonGroup
      color="primary"
      value={exclusive ? values[0] : values}
      exclusive={exclusive}
      onChange={(_, value) => {
        if (onChange) {
          if (
            enforceAtLeastOne &&
            ((exclusive && !value) || (!exclusive && value.length === 0))
          )
            return;

          onChange(exclusive ? (value === null ? [] : [value]) : value);
        }
      }}
      aria-label="Gear Types"
      sx={{ flexWrap: "wrap" }}
    >
      {gearNames.map((gearName) => (
        <ToggleButton key={gearName} value={gearName}>
          <GearTypeIcon gearName={gearName} monochromeWhite size={size} />
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
