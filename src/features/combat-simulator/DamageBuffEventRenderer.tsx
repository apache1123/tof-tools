import { Box, Tooltip } from '@mui/material';

import type { DamageBuffEvent } from '../../models/v4/damage-buff-event';
import type { CombatSimulatorTimelineAction } from './CombatSimulatorTimeline';

export function DamageBuffEventRenderer({
  action,
}: {
  action: CombatSimulatorTimelineAction<DamageBuffEvent>;
}) {
  return (
    <Tooltip title={action.event.damageBuffDefinition.displayName}>
      <Box width="100%" height="100%"></Box>
    </Tooltip>
  );
}
