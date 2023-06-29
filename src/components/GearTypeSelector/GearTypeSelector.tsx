import { Autocomplete, TextField } from '@mui/material';
import { SyntheticEvent } from 'react';

import { gearTypes } from '../../../configs/gear-types';
import { GearType } from '../../models/gear-type';

export interface GearTypeSelectorProps {
  selectedGearType: GearType | undefined;
  onChange(value: GearType | undefined): void;
}

const options = gearTypes.allIds.map((id) => gearTypes.byId[id]);

export const GearTypeSelector = ({
  selectedGearType,
  onChange,
}: GearTypeSelectorProps) => {
  const handleChange = (_: SyntheticEvent, value: GearType | null) => {
    onChange(value ?? undefined);
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.displayName}
      renderInput={(params) => (
        <TextField {...params} label="Select gear type" variant="standard" />
      )}
      value={selectedGearType ?? null}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      size="small"
      fullWidth
    />
  );
};
