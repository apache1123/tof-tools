import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Autocomplete, Box, TextField, Tooltip } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { SyntheticEvent } from 'react';

import { GearType } from '../../models/gear-type';
import { GearStarsSelector } from '../GearStarsSelector/GearStarsSelector';
import { GearTypeIcon } from '../GearTypeIcon/GearTypeIcon';

export interface GearTypeSelectorProps {
  possibleGearTypes: GearType[];
  selectedGearType: GearType | undefined;
  selectedGearStars: number;
  onChange(value: GearType | undefined): void;
  onStarsChange?(value: number): void;
}

export const GearTypeSelector = ({
  possibleGearTypes,
  selectedGearType,
  selectedGearStars,
  onChange,
  onStarsChange,
}: GearTypeSelectorProps) => {
  const handleChange = (_: SyntheticEvent, value: GearType | null) => {
    onChange(value ?? undefined);
  };

  return (
    <Grid container spacing={2}>
      <Grid maxWidth={90} display="flex" alignItems="center">
        <GearTypeIcon gearName={selectedGearType?.name} size={80} />
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
          value={selectedGearType}
          onChange={handleChange}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          size="small"
          fullWidth
        />
        <Box mt={1}>
          <GearStarsSelector
            stars={selectedGearStars}
            onStarsChange={onStarsChange}
          />
          {!selectedGearStars && (
            <Tooltip title="This is optional and won't affect the calculations if not selected, but will aid the tool in determining the roll details.">
              <InfoOutlinedIcon sx={{ ml: 1 }} />
            </Tooltip>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
