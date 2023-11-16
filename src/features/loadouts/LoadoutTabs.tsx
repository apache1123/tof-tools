import AddIcon from '@mui/icons-material/Add';
import { Box, Paper, Tab, Tabs } from '@mui/material';
import { useSnapshot } from 'valtio';

import { ElementalTypeIcon } from '../../components/ElementalTypeIcon/ElementalTypeIcon';
import { loadoutsState } from '../../states/states';

export function LoadoutTabs() {
  const { loadoutList, selectedLoadoutIndex, selectedLoadout } =
    useSnapshot(loadoutsState);

  return (
    <Paper square elevation={0} sx={{ p: 0 }}>
      <Tabs
        value={selectedLoadoutIndex}
        onChange={(_, value) => {
          if (value === 'add') {
            loadoutsState.addNewLoadout();
            loadoutsState.selectedLoadoutIndex =
              loadoutsState.loadoutList.length - 1;
          } else {
            loadoutsState.selectedLoadoutIndex = value;
          }
        }}
        TabIndicatorProps={{
          className: selectedLoadout.elementalType,
          sx: {
            [`&.${selectedLoadout.elementalType}`]: {
              backgroundColor: `${selectedLoadout.elementalType?.toLowerCase()}.main`,
            },
          },
        }}
      >
        {loadoutList.map((loadoutListItem, index) => {
          const loadout = loadoutListItem.loadout;
          return (
            <Tab
              key={index}
              value={index}
              label={
                <Box display="flex" alignItems="center">
                  {loadout.elementalType && (
                    <Box mr={1} display="flex" alignItems="center">
                      <ElementalTypeIcon
                        elementalType={loadout.elementalType}
                      />
                    </Box>
                  )}
                  <Box>{loadout.name}</Box>
                </Box>
              }
              className={loadout.elementalType}
              sx={{
                [`&.${loadout.elementalType}`]: {
                  color: `${loadout.elementalType?.toLowerCase()}.main`,
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
    </Paper>
  );
}
