import { ToggleButton } from "@mui/material";

import type { GearTypeId } from "../../../definitions/gear-types";
import { getGearTypeOrder } from "../../../definitions/gear-types";
import { ToggleButtonGroup } from "../../common/ToggleButtonGroup/ToggleButtonGroup";
import { GearTypeIcon } from "../GearTypeIcon/GearTypeIcon";

const gearTypeIds = getGearTypeOrder();

export interface GearTypeToggleProps {
  /** Array of selected gear type ids. When exclusive is false, this will be one in the array. When exclusive is true, there can be multiple. */
  values: GearTypeId[];
  exclusive?: boolean;
  /** Enforce at least one gear type to be selected (except at initial state) i.e. cannot deselect all gear types. */
  enforceAtLeastOne?: boolean;
  size?: number;
  /** @param values - Array of selected gear ids (or empty array if none). */
  onChange?: (values: GearTypeId[]) => void;
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
      value={values}
      exclusive={exclusive}
      enforceAtLeastOne={enforceAtLeastOne}
      onChange={(_, value) => {
        if (onChange) onChange(value);
      }}
      aria-label="Gear Types"
      sx={{ flexWrap: "wrap" }}
    >
      {gearTypeIds.map((id) => (
        <ToggleButton key={id} value={id}>
          <GearTypeIcon id={id} monochromeWhite size={size} />
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
