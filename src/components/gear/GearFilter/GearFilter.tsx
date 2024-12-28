import type { GearFilter } from "../../../states/gear/gear-filter";
import { GearTypeToggle } from "../GearTypeToggle/GearTypeToggle";

export interface GearFilterProps {
  filter: GearFilter;
  onChange(filter: GearFilter): void;
}

export function GearFilter({ filter, onChange }: GearFilterProps) {
  return (
    <GearTypeToggle
      values={filter.gearTypeIds}
      onChange={(gearTypeIds) => {
        onChange({ ...filter, gearTypeIds });
      }}
    />
  );
}
