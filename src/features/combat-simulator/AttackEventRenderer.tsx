import { Box, Tooltip } from '@mui/material';

import type { AttackEvent } from '../../models/v4/attack-event';
import type { CombatSimulatorTimelineAction } from './CombatSimulatorTimeline';

export function AttackEventRenderer({
  action,
}: {
  action: CombatSimulatorTimelineAction<AttackEvent>;
}) {
  return (
    <Tooltip title={action.event.attack.attackDefinition.displayName}>
      <Box width="100%" height="100%"></Box>
    </Tooltip>
  );
}
