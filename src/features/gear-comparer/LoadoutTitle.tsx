import { Divider, Stack, Typography } from '@mui/material';
import { useSnapshot } from 'valtio';

import { ElementalStyledText } from '../../components/ElementalStyledText/ElementalStyledText';
import { ElementalTypeIcon } from '../../components/ElementalTypeIcon/ElementalTypeIcon';
import type { GearComparerState } from '../../states/gear-comparer';
import { gearComparerState } from '../../states/states';

export function LoadoutTitle() {
  const {
    loadoutsState: { selectedLoadout },
  } = useSnapshot(gearComparerState) as GearComparerState;

  return (
    <Stack
      direction="row"
      alignItems="center"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
    >
      <Typography variant="h4">Loadout {selectedLoadout.name}</Typography>
      <Typography display="flex" alignItems="center">
        Comparing using{' '}
        <ElementalStyledText
          elementalType={selectedLoadout.elementalType}
          mx={1}
        >
          {selectedLoadout.elementalType}
        </ElementalStyledText>{' '}
        <ElementalTypeIcon elementalType={selectedLoadout.elementalType} />
      </Typography>
    </Stack>
  );
}
