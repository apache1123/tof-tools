import { ToggleButton } from "@mui/material";

import type { GearRarity } from "../../../models/gear/gear-rarity";
import { gearRarities } from "../../../models/gear/gear-rarity";
import { ToggleButtonGroup } from "../../common/ToggleButtonGroup/ToggleButtonGroup";

export interface GearRarityToggleProps {
  value: GearRarity;
  onChange(value: GearRarity): void;
}

export function GearRarityToggle({ value, onChange }: GearRarityToggleProps) {
  return (
    <ToggleButtonGroup
      value={[value]}
      exclusive
      enforceAtLeastOne
      onChange={(_, value) => {
        onChange(value[0]);
      }}
    >
      {gearRarities.map((gearRarity) => (
        <ToggleButton value={gearRarity} key={gearRarity} size="small">
          {gearRarity}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
