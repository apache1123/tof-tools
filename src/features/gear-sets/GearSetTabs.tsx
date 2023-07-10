import AddIcon from '@mui/icons-material/Add';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useSnapshot } from 'valtio';

import { AddGearSetModal } from './AddGearSetModal';
import {
  gearSetsStore,
  getDefaultGearSetName,
  setSelectedGearSetIndex,
} from './stores/gear-sets';

export function GearSetTabs() {
  const { gearSets, selectedGearSetIndex } = useSnapshot(gearSetsStore);

  const [openAddGearSetModal, setOpenAddGearSetModal] = useState(false);

  return (
    <Paper square elevation={0} sx={{ p: 0 }}>
      <Tabs
        value={selectedGearSetIndex}
        onChange={(_, value) => {
          if (value === 'add') {
            setOpenAddGearSetModal(true);
          } else {
            setSelectedGearSetIndex(value);
          }
        }}
        textColor="secondary"
        indicatorColor="secondary"
      >
        {gearSets.allIds.map((id, index) => {
          const gearSet = gearSets.byId[id];
          return (
            <Tab
              key={index}
              value={index}
              label={gearSet.name || getDefaultGearSetName(index)}
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
