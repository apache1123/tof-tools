import { Autocomplete, TextField } from '@mui/material';
import { StatType } from '../../models/stat-type';

export interface StatTypeSelectorProps {
  possibleStatTypes: StatType[];
  selectedStatType?: StatType;
  onChange?: (value: StatType) => unknown;
}

export const StatTypeSelector = ({
  possibleStatTypes,
  selectedStatType = null,
  onChange,
}: StatTypeSelectorProps) => {
  const handleChange = (_, value: StatType) => {
    onChange(value);
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
      size="small"
      fullWidth
    />
  );
};
