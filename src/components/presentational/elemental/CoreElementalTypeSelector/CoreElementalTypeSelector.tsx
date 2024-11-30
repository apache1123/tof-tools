import type { FormControlProps, SelectChangeEvent } from "@mui/material";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { ReactNode } from "react";

import type { CoreElementalType } from "../../../../definitions/elemental-type";
import { ElementalStyledText } from "../ElementalStyledText/ElementalStyledText";
import { ElementalTypeIcon } from "../ElementalTypeIcon/ElementalTypeIcon";

export interface CoreElementalTypeSelectorProps {
  elementalType: CoreElementalType | undefined;
  label?: ReactNode;
  size?: "small" | "medium";
  required?: boolean;
  variant?: FormControlProps["variant"];
  disabled?: boolean;

  onElementalTypeChange?(value: CoreElementalType): void;
}

const options: CoreElementalType[] = ["Flame", "Frost", "Physical", "Volt"];

export function CoreElementalTypeSelector({
  elementalType,
  onElementalTypeChange,
  label = "Elemental type",
  size = "medium",
  required = false,
  variant = "standard",
  disabled,
}: CoreElementalTypeSelectorProps) {
  const handleChange = (event: SelectChangeEvent) => {
    if (onElementalTypeChange)
      onElementalTypeChange(event.target.value as CoreElementalType);
  };

  return (
    <FormControl
      variant={variant}
      fullWidth
      required={required}
      error={required && !elementalType}
      size={size}
      disabled={disabled}
    >
      <InputLabel id="elemental-type-select-label">{label}</InputLabel>
      <Select
        labelId="elemental-type-select-label"
        id="elemental-type-select"
        value={elementalType ?? ""}
        label={label}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Box display="flex" alignItems="center">
              <ElementalTypeIcon elementalType={option} />
              <Box ml={1}>
                <ElementalStyledText elementalType={option}>
                  {option}
                </ElementalStyledText>
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
