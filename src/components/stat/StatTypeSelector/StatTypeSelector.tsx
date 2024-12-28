import { Autocomplete, TextField } from "@mui/material";
import type { SyntheticEvent } from "react";

import type { StatType } from "../../../models/gear/stat-type";

export interface StatTypeSelectorProps {
  possibleStatTypes: StatType[];
  selectedStatType?: StatType | undefined;
  onChange?: (value: StatType) => unknown;
  disabled?: boolean;
}

export const StatTypeSelector = ({
  possibleStatTypes,
  selectedStatType,
  onChange,
  disabled,
}: StatTypeSelectorProps) => {
  const handleChange = (event: SyntheticEvent, value: StatType) => {
    if (onChange) onChange(value);
  };
  return (
    <Autocomplete
      options={possibleStatTypes}
      getOptionLabel={(option) => option.id}
      renderInput={(params) => (
        <TextField {...params} label="Stat" variant="standard" />
      )}
      value={selectedStatType}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      disableClearable
      size="small"
      fullWidth
      disabled={disabled}
      aria-label="stat-type-selector"
    />
  );
};
