import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

import { StyledModal } from '../../components/Modal/StyledModal';
import { GearSet } from '../../models/gear-set';
import { gearSetsState } from './states/gear-sets';

export interface AddGearSetModalProps {
  open: boolean;
  onClose(): void;
}

export function AddGearSetModal({ open, onClose }: AddGearSetModalProps) {
  const { defaultNewGearSetName } = useSnapshot(gearSetsState);

  const [newGearSetName, setNewGearSetName] = useState(defaultNewGearSetName);

  useEffect(() => {
    setNewGearSetName(defaultNewGearSetName);
  }, [defaultNewGearSetName, open]);

  return (
    <StyledModal
      open={open}
      modalTitle="Add gear set"
      modalContent={
        <TextField
          label="Name"
          value={newGearSetName}
          onChange={(event) => {
            setNewGearSetName(event.target.value);
          }}
        />
      }
      showConfirm
      showCancel
      onConfirm={() => {
        const gearSet = new GearSet(newGearSetName);
        gearSetsState.addGearSet(gearSet);

        const newGearSetIndex = gearSetsState.gearSets.allIds.findIndex(
          (id) => id === gearSet.id
        );
        if (newGearSetIndex !== -1) {
          gearSetsState.selectedGearSetIndex = newGearSetIndex;
        }

        onClose();
      }}
      onClose={onClose}
    />
  );
}
