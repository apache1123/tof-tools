import { Autocomplete, TextField } from '@mui/material';
import type { SyntheticEvent } from 'react';

import { gearTypesLookup } from '../../constants/gear-types';
import type { GearType } from '../../models/gear-type';

export interface GearTypeSelectorProps {
  selectedGearType: GearType | undefined;
  onChange(value: GearType): void;
}

const options = gearTypesLookup.allIds.map((id) => gearTypesLookup.byId[id]);

export const GearTypeSelector = ({
  selectedGearType,
  onChange,
}: GearTypeSelectorProps) => {
  const handleChange = (_: SyntheticEvent, value: GearType) => {
    onChange(value);
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.displayName}
      renderInput={(params) => (
        <TextField {...params} label="Select gear type" variant="standard" />
      )}
      value={selectedGearType}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      disableClearable
      size="small"
      fullWidth
    />
  );
};
