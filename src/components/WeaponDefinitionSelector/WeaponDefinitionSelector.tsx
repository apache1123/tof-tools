import { Autocomplete, TextField } from '@mui/material';

import type { Weapon as WeaponDefinition } from '../../definitions/types/weapon/weapon';
import { weaponDefinitions } from '../../definitions/weapons/weapon-definitions';

export interface WeaponDefinitionSelectorProps {
  selectedWeaponDefinition: WeaponDefinition | undefined;
  onChange(value: WeaponDefinition | undefined): void;
  disabled?: boolean;
}

const options = weaponDefinitions.allIds.map(
  (id) => weaponDefinitions.byId[id]
);

export const WeaponDefinitionSelector = ({
  selectedWeaponDefinition,
  onChange,
  disabled,
}: WeaponDefinitionSelectorProps) => {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.displayName}
      renderInput={(params) => (
        <TextField {...params} label="Select weapon" variant="standard" />
      )}
      value={selectedWeaponDefinition ?? null}
      onChange={(_, value) => {
        onChange(value ?? undefined);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      size="small"
      fullWidth
      disabled={disabled}
    />
  );
};
