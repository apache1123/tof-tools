import { Autocomplete, TextField } from '@mui/material';
import type { SyntheticEvent } from 'react';

import { weaponDefinitions } from '../../constants/weapon-definitions';
import type { WeaponDefinition } from '../../models/weapon-definition';


export interface WeaponDefinitionSelectorProps {
  selectedWeaponDefinition: WeaponDefinition | undefined;
  onChange(value: WeaponDefinition): void;
  disabled?: boolean;
}

const options = weaponDefinitions.allIds.map((id) => weaponDefinitions.byId[id]);

export const WeaponDefinitionSelector = ({
  selectedWeaponDefinition,
  onChange,
  disabled,
}: WeaponDefinitionSelectorProps) => {
  const handleChange = (_: SyntheticEvent, value: WeaponDefinition) => {
    onChange(value);
  };

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.displayName}
      renderInput={(params) => (
        <TextField {...params} label="Select weapon" variant="standard" />
      )}
      value={selectedWeaponDefinition}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      disableClearable
      size="small"
      fullWidth
      disabled={disabled}
    />
  );
};
