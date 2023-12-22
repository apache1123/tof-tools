import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { gearTypesLookup } from '../../constants/gear-types';
import type { GearType } from '../../models/gear-type';
import { GearTypeIcon } from '../GearTypeIcon/GearTypeIcon';

type Value = { gearType: GearType; isTitan: boolean };
export interface GearTypeSelectorProps {
  selectedValue: Value | undefined;
  onChange?(value: Value): void;
  /** Disable gear type change (e.g. from a Helmet to an Eyepiece) if a gear type is already selected, but still allow the change to a Titan/non-Titan variation of that gear type */
  disableGearTypeChange?: boolean;
  disabled?: boolean;
}

export const GearTypeSelector = ({
  selectedValue,
  onChange,
  disableGearTypeChange,
  disabled,
}: GearTypeSelectorProps) => {
  const [options, setOptions] = useState<Value[]>([]);

  // When there is a selected gear type and it cannot be changed e.g. in loadouts where the gear type is fixed, only allow two options - the non-titan gear of that type and a titan gear of that type.
  // Other cases, show all gear types and their titan variants
  useEffect(() => {
    setOptions(
      selectedValue && disableGearTypeChange
        ? gearTypesLookup.allIds
            .filter((id) => selectedValue.gearType.id === id)
            .reduce((acc, id) => {
              const gearType = gearTypesLookup.byId[id];
              return acc.concat([
                { gearType, isTitan: false },
                { gearType, isTitan: true },
              ]);
            }, [] as Value[])
        : gearTypesLookup.allIds
            .map((id) => ({
              gearType: gearTypesLookup.byId[id],
              isTitan: false,
            }))
            .concat(
              gearTypesLookup.allIds.map((id) => ({
                gearType: gearTypesLookup.byId[id],
                isTitan: true,
              }))
            )
    );
  }, [selectedValue, disableGearTypeChange]);

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
      value={selectedValue}
      onChange={(_, { gearType, isTitan }) => {
        if (onChange) {
          onChange({ gearType, isTitan });
        }
      }}
      isOptionEqualToValue={(option, value) =>
        option.gearType.id === value.gearType.id &&
        option.isTitan === value.isTitan
      }
      renderOption={(props, { gearType, isTitan }) => (
        <Stack direction="row" spacing={1} component="li" {...props}>
          <GearTypeIcon gearName={gearType.id} isTitan={isTitan} size={30} />
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
