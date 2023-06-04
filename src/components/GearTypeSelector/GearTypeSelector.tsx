import { Autocomplete, TextField } from '@mui/material';
import { GearType } from '../../types';
import { GearTypeIcon } from '../GearTypeIcon/GearTypeIcon';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

export interface GearTypeSelectorProps {
  possibleGearTypes: GearType[];
  selectedGearType: GearType;
  onChange(value: GearType);
}

export const GearTypeSelector = ({
  possibleGearTypes,
  selectedGearType,
  onChange,
}: GearTypeSelectorProps) => {
  const handleChange = (_, value: GearType) => {
    onChange(value);
  };

  return (
    <Grid container spacing={2}>
      <Grid maxWidth={90} display="flex" alignItems="center">
        <GearTypeIcon gearName={selectedGearType?.name} size={80} />
      </Grid>
      <Grid xs display="flex" alignItems="center">
        <Autocomplete
          options={possibleGearTypes || []}
          getOptionLabel={(gearType) => gearType.name}
          renderInput={(params) => (
            <TextField {...params} label="Gear Type" variant="standard" />
          )}
          value={selectedGearType}
          onChange={handleChange}
          size="small"
          fullWidth
        />
      </Grid>
    </Grid>
  );
};
