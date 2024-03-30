import { Box, Paper, Stack, Typography } from '@mui/material';

import { toShortNumberFormat } from '../../utils/locale-utils';
import { toMinutesAndSeconds } from '../../utils/time-utils';

export interface DamageSummaryBreakdownTopBarProps {
  totalBaseDamage: number;
  totalFinalDamage: number;
  totalMultiplier: number;
  duration: number;
}

export function DamageSummaryBreakdownTopBar({
  totalBaseDamage,
  totalFinalDamage,
  totalMultiplier,
  duration,
}: DamageSummaryBreakdownTopBarProps) {
  return (
    <Paper>
      <Stack direction="row" alignItems="center">
        <Box width={150} minWidth={150} maxWidth={150} padding={2}>
          <Typography>Total Damage</Typography>
        </Box>
        <Stack
          width="100%"
          spacing={1}
          direction="row"
          justifyContent="space-between"
          paddingX={2}
        >
          <Stack justifyContent="center">
            <Typography>Base</Typography>
            <Typography>{toShortNumberFormat(totalBaseDamage)}</Typography>
          </Stack>
          <Stack justifyContent="center">
            <Typography>Final</Typography>
            <Typography>{toShortNumberFormat(totalFinalDamage)}</Typography>
          </Stack>
          <Stack justifyContent="center">
            <Typography>Multiplier</Typography>
            <Typography>{toShortNumberFormat(totalMultiplier)}</Typography>
          </Stack>
          <Stack justifyContent="center">
            <Typography>Duration</Typography>
            <Typography>{toMinutesAndSeconds(duration)}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
