import AddIcon from '@mui/icons-material/Add';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useSnapshot } from 'valtio';

import { ElementalTypeIcon } from '../../components/ElementalTypeIcon/ElementalTypeIcon';
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
        textColor="primary"
        indicatorColor="primary"
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
                    <ElementalTypeIcon elementalType={gearSet.elementalType} />
                  )}
                  <Box ml={1}>
                    {gearSet.name || getDefaultGearSetName(index)}
                  </Box>
                </Box>
              }
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
