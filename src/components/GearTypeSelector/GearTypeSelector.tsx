import { Autocomplete, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { GearType } from '../../models/gear-type';
import { GearTypeIcon } from '../GearTypeIcon/GearTypeIcon';

export interface GearTypeSelectorProps {
  possibleGearTypes: GearType[];
  selectedGearType: GearType;
  onChange(value: GearType);
}

export const GearTypeSelector = ({
  possibleGearTypes,
  selectedGearType = null,
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
            <TextField
              {...params}
              label="Select gear type"
              variant="standard"
            />
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
