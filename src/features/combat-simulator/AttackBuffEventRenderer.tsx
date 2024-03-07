import { Box, Tooltip } from '@mui/material';

import type { AttackBuffEvent } from '../../models/v4/attack-buff-event';
import type { CombatSimulatorTimelineAction } from './CombatSimulatorTimeline';

export function AttackBuffEventRenderer({
  action,
}: {
  action: CombatSimulatorTimelineAction<AttackBuffEvent>;
}) {
  return (
    <Tooltip title={action.event.attackBuffDefinition.displayName}>
      <Box width="100%" height="100%"></Box>
    </Tooltip>
  );
}
