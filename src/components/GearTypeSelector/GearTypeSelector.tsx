import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Autocomplete, Box, TextField, Tooltip } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { GearType } from '../../models/gear-type';
import { GearStarsSelector } from '../GearStarsSelector/GearStarsSelector';
import { GearTypeIcon } from '../GearTypeIcon/GearTypeIcon';

export interface GearTypeSelectorProps {
  possibleGearTypes: GearType[];
  selectedGearType: GearType;
  selectedGearStars: number;
  onChange(value: GearType);
  onStarsChange?(value: number);
}

export const GearTypeSelector = ({
  possibleGearTypes,
  selectedGearType = null,
  selectedGearStars,
  onChange,
  onStarsChange,
}: GearTypeSelectorProps) => {
  const handleChange = (_, value: GearType) => {
    onChange(value);
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
