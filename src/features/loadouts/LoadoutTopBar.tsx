import { Box, Stack, Typography } from '@mui/material';
import { useSnapshot } from 'valtio';

import { loadoutsState } from '../../states/states';
import { DeleteLoadout } from './DeleteLoadout';
import { LoadoutElementalType } from './LoadoutElementalType';
import { LoadoutName } from './LoadoutName';

export function LoadoutTopBar() {
  const {
    selectedLoadoutItem: { isDefault },
  } = useSnapshot(loadoutsState);
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Box display="flex">
          <LoadoutName />
          <Box width={160} ml={3}>
            <LoadoutElementalType />
          </Box>
        </Box>
        {!isDefault && (
          <Box>
            <DeleteLoadout />
          </Box>
        )}
      </Stack>
      {isDefault && (
        <Typography variant="caption" sx={{ mt: 1 }} fontStyle="italic">
          Default loadout - can rename, but cannot change element type or
          delete.
        </Typography>
      )}
    </Box>
  );
}
