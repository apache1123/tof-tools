import { Autocomplete, Stack, TextField, Typography } from "@mui/material";

import { getGearType, getGearTypeOrder } from "../../../definitions/gear-types";
import type { GearType } from "../../../models/gear/gear-type";
import { GearTypeIcon } from "../GearTypeIcon/GearTypeIcon";

type Option = { gearType: GearType; isTitan?: boolean };

export interface GearTypeSelectorProps {
  selectedGearType: GearType | undefined;
  options?: Option[];
  disabled?: boolean;

  onChange?(value: GearType): void;
}

const defaultOptions: Option[] = getGearTypeOrder().map((id) => ({
  gearType: getGearType(id),
  isTitan: false,
}));

export const GearTypeSelector = ({
  selectedGearType,
  options: optionsFromProps,
  onChange,
  disabled,
}: GearTypeSelectorProps) => {
  const options = optionsFromProps || defaultOptions;

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) =>
        option.isTitan
          ? `Titan ${option.gearType.displayName}`
          : option.gearType.displayName
      }
      renderInput={(params) => (
        <TextField {...params} label="Select gear type" variant="standard" />
      )}
      value={options?.find(
        (option) => option.gearType.id === selectedGearType?.id,
      )}
      onChange={(_, { gearType }) => {
        if (onChange) {
          onChange(gearType);
        }
      }}
      isOptionEqualToValue={(option, value) =>
        option.gearType.id === value.gearType.id
      }
      renderOption={(props, { gearType, isTitan }) => (
        <Stack direction="row" spacing={1} component="li" {...props}>
          <GearTypeIcon
            id={gearType.id}
            rarity={isTitan ? "Titan" : "SSR"}
            size={30}
          />
          <Typography>
            {isTitan ? `Titan ${gearType.displayName}` : gearType.displayName}
          </Typography>
        </Stack>
      )}
      disableClearable
      size="small"
      fullWidth
      disabled={disabled}
    />
  );
};
