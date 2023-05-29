import { Autocomplete, TextField } from '@mui/material';
import { Stat } from '../../types';

export interface StatSelectorProps {
  stats: Stat[];
  value?: Stat;
  onChange?: (value: Stat) => unknown;
}

export const StatSelector = ({ stats, value, onChange }: StatSelectorProps) => {
  const handleChange = (_, value: Stat) => {
    onChange(value);
  };
  return (
    <Autocomplete
      options={stats}
      getOptionLabel={(option) => option.definition.name}
      renderInput={(params) => <TextField {...params} label="Stat" />}
      value={value}
      onChange={handleChange}
      size="small"
    />
  );
};
