import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Input, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useSnapshot } from 'valtio';

import { ElementalStyledText } from '../../components/ElementalStyledText/ElementalStyledText';
import { setName } from '../../models/gear-set';
import { gearSetsState } from './states/gear-sets';

const iconSize = 'small';

export function CurrentGearSetName() {
  const { selectedGearSet } = useSnapshot(gearSetsState);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingName, setEditingName] = useState('');

  if (!selectedGearSet) {
    return null;
  }

  function saveName() {
    if (gearSetsState.selectedGearSet) {
      setName(gearSetsState.selectedGearSet, editingName);
    }
  }

  return (
    <Stack direction="row" alignItems="center">
      {!isEditMode && (
        <>
          <Typography variant="h5" component="h1">
            {selectedGearSet.elementalType ? (
              <ElementalStyledText
                elementalType={selectedGearSet.elementalType}
                variant="h5"
              >
                {selectedGearSet.name}
              </ElementalStyledText>
            ) : (
              selectedGearSet.name
            )}
          </Typography>
          <IconButton
            onClick={() => {
              setEditingName(selectedGearSet.name);
              setIsEditMode(true);
            }}
            sx={{ ml: 0.5 }}
            aria-label="edit-gear-set-name"
          >
            <EditIcon fontSize={iconSize} />
          </IconButton>
        </>
      )}
      {isEditMode && (
        <>
          <Input
            value={editingName}
            onChange={(event) => {
              setEditingName(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                saveName();
                setIsEditMode(false);
              }
            }}
            sx={{ width: 125 }}
          />
          <IconButton
            onClick={() => {
              saveName();
              setIsEditMode(false);
            }}
          >
            <DoneIcon color="success" fontSize={iconSize}></DoneIcon>
          </IconButton>
          <IconButton
            onClick={() => {
              setIsEditMode(false);
            }}
          >
            <ClearIcon color="error" fontSize={iconSize}></ClearIcon>
          </IconButton>
        </>
      )}
    </Stack>
  );
}
