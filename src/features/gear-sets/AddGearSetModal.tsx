import { Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

import { StyledModal } from '../../components/Modal/StyledModal';
import { newGearSet } from '../../models/gear-set';
import { addGearSet, gearSetsStore } from './stores/gear-sets';

export interface AddGearSetModalProps {
  open: boolean;
  onClose(): void;
}

export function AddGearSetModal({ open, onClose }: AddGearSetModalProps) {
  const { defaultNewGearSetName } = useSnapshot(gearSetsStore);

  const [newGearSetName, setNewGearSetName] = useState(defaultNewGearSetName);

  useEffect(() => {
    setNewGearSetName(defaultNewGearSetName);
  }, [defaultNewGearSetName, open]);

  return (
    <StyledModal
      open={open}
      modalContent={
        <>
          <Box mb={1}>Save gear to gear set</Box>
          <TextField
            label="Name"
            value={newGearSetName}
            onChange={(event) => {
              setNewGearSetName(event.target.value);
            }}
          />
        </>
      }
      showConfirm
      showCancel
      onConfirm={() => {
        const gearSet = newGearSet(newGearSetName);
        addGearSet(gearSet);
        onClose();
      }}
      onClose={onClose}
    />
  );
}
