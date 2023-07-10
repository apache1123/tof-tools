import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';

import type { GearSet } from '../models/gear-set';
import {
  gearSetsStore,
  getDefaultGearSetName,
} from './gear-sets/stores/gear-sets';

export interface GearSetSelectorProps {
  onGearSetSelect(gearSet: GearSet): void;
}

interface Option {
  id: string;
  name: string;
}

export function GearSetSelector({ onGearSetSelect }: GearSetSelectorProps) {
  const { gearSets, selectedGearSet } = useSnapshot(gearSetsStore);

  const options: Option[] = gearSets.allIds
    .map((id, index) => {
      const gearSet = gearSets.byId[id];
      if (gearSet) {
        const name = gearSet.name || getDefaultGearSetName(index);
        return { id: gearSet.id, name };
      }
    })
    .filter((option) => option) as Option[];

  const defaultValue = selectedGearSet?.id;

  useEffect(() => {
    if (gearSetsStore.selectedGearSet) {
      onGearSetSelect(gearSetsStore.selectedGearSet);
    }
  }, [onGearSetSelect]);

  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel id="gear-set-select-label">Gear set</InputLabel>
      <Select
        labelId="gear-set-select-label"
        id="gear-set-select"
        defaultValue={defaultValue}
        label="Gear set"
        onChange={(event) => {
          const id = event.target.value;
          const gearSet = gearSetsStore.gearSets.byId[id];
          onGearSetSelect(gearSet);
        }}
      >
        {options.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
