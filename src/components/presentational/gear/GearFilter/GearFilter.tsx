import type { GearFilter } from "../../../../states/gears/gear-filter";
import { GearTypeToggle } from "../GearTypeToggle/GearTypeToggle";

export interface GearFilterProps {
  filter: GearFilter;
  onChange(filter: GearFilter): void;
}

export function GearFilter({ filter, onChange }: GearFilterProps) {
  return (
    <GearTypeToggle
      values={filter.gearNames}
      onChange={(gearNames) => {
        onChange({ ...filter, gearNames });
      }}
    />
  );
}
