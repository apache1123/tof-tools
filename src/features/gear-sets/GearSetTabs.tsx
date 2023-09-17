import AddIcon from '@mui/icons-material/Add';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useSnapshot } from 'valtio';

import { ElementalTypeIcon } from '../../components/ElementalTypeIcon/ElementalTypeIcon';
import { AddGearSetModal } from './AddGearSetModal';
import { gearSetsState, getDefaultGearSetName } from './states/gear-sets';

export function GearSetTabs() {
  const { gearSets, selectedGearSetIndex, selectedGearSet } =
    useSnapshot(gearSetsState);

  const [openAddGearSetModal, setOpenAddGearSetModal] = useState(false);

  return (
    <Paper square elevation={0} sx={{ p: 0 }}>
      <Tabs
        value={selectedGearSetIndex}
        onChange={(_, value) => {
          if (value === 'add') {
            setOpenAddGearSetModal(true);
          } else {
            gearSetsState.selectedGearSetIndex = value;
          }
        }}
        TabIndicatorProps={{
          className: selectedGearSet?.elementalType,
          sx: {
            [`&.${selectedGearSet?.elementalType}`]: {
              backgroundColor: `${selectedGearSet?.elementalType?.toLowerCase()}.main`,
            },
          },
        }}
      >
        {gearSets.allIds.map((id, index) => {
          const gearSet = gearSets.byId[id];
          return (
            <Tab
              key={index}
              value={index}
              label={
                <Box display="flex" alignItems="center">
                  {gearSet.elementalType && (
                    <Box mr={1} display="flex" alignItems="center">
                      <ElementalTypeIcon
                        elementalType={gearSet.elementalType}
                      />
                    </Box>
                  )}
                  <Box>{gearSet.name || getDefaultGearSetName(index)}</Box>
                </Box>
              }
              className={gearSet.elementalType}
              sx={{
                [`&.${gearSet.elementalType}`]: {
                  color: `${gearSet.elementalType?.toLowerCase()}.main`,
                },
              }}
            />
          );
        })}
        <Tab
          value="add"
          label={
            <Box display="flex" alignItems="center">
              <AddIcon sx={{ mr: 1 }} />
              Add
            </Box>
          }
        />
      </Tabs>
      <AddGearSetModal
        open={openAddGearSetModal}
        onClose={() => {
          setOpenAddGearSetModal(false);
        }}
      />
    </Paper>
  );
}
