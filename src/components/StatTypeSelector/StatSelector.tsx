import { Autocomplete, TextField } from '@mui/material';
import { SyntheticEvent } from 'react';

import { StatType } from '../../models/stat-type';

export interface StatTypeSelectorProps {
  possibleStatTypes: StatType[];
  selectedStatType?: StatType;
  onChange?: (value: StatType | undefined) => unknown;
}

export const StatTypeSelector = ({
  possibleStatTypes,
  selectedStatType,
  onChange,
}: StatTypeSelectorProps) => {
  const handleChange = (event: SyntheticEvent, value: StatType | null) => {
    if (onChange) onChange(value ?? undefined);
  };
  return (
    <Autocomplete
      options={possibleStatTypes}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label="Stat" variant="standard" />
      )}
      value={selectedStatType}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      size="small"
      fullWidth
    />
  );
};
