import { Box, Tooltip } from '@mui/material';

import type { CombatSimulatorTimelineAction } from './CombatSimulatorTimeline';

export function AttackBuffEventRenderer({
  action,
}: {
  action: CombatSimulatorTimelineAction;
}) {
  return (
    <Tooltip title={action.displayName}>
      <Box width="100%" height="100%"></Box>
    </Tooltip>
  );
}
