import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { ElementalType } from '../../models/stat-type';

export interface ElementalTypeSelectorProps {
  elementalType: ElementalType;
  onElementalTypeChange?(value: ElementalType);
  label?: string;
}

const options = [
  ElementalType.Flame,
  ElementalType.Frost,
  ElementalType.Physical,
  ElementalType.Volt,
];

export function ElementalTypeSelector({
  elementalType,
  onElementalTypeChange,
  label = 'Elemental type',
}: ElementalTypeSelectorProps) {
  const handleChange = (event: SelectChangeEvent) => {
    if (onElementalTypeChange)
      onElementalTypeChange(event.target.value as ElementalType);
  };

  return (
    <FormControl variant="filled" fullWidth required error={!elementalType}>
      <InputLabel id="elemental-type-select-label">{label}</InputLabel>
      <Select
        labelId="elemental-type-select-label"
        id="elemental-type-select"
        value={elementalType ?? ''}
        label="Elemental type"
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
