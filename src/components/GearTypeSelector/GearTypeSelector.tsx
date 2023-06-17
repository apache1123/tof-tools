import { Autocomplete, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { Gear } from '../../models/gear';
import { GearType } from '../../models/gear-type';
import { GearStarsSelector } from '../GearStarsSelector/GearStarsSelector';
import { GearTypeIcon } from '../GearTypeIcon/GearTypeIcon';

export interface GearTypeSelectorProps {
  possibleGearTypes: GearType[];
  gear: Gear;
  onChange(value: GearType);
  onStarsChange?(value: number);
}

export const GearTypeSelector = ({
  possibleGearTypes,
  gear = null,
  onChange,
  onStarsChange,
}: GearTypeSelectorProps) => {
  const handleChange = (_, value: GearType) => {
    onChange(value);
  };

  return (
    <Grid container spacing={2}>
      <Grid maxWidth={90} display="flex" alignItems="center">
        <GearTypeIcon gearName={gear?.type?.name} size={80} />
      </Grid>
      <Grid xs display="flex" flexDirection="column" justifyContent="center">
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
          value={gear.type}
          onChange={handleChange}
          size="small"
          fullWidth
        />
        <GearStarsSelector stars={gear.stars} onStarsChange={onStarsChange} />
      </Grid>
    </Grid>
  );
};
