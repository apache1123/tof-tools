import { Box, Tooltip } from '@mui/material';

import type { WeaponDamageBuffEvent } from '../../models/v4/weapon-damage-buff-event';
import type { CombatSimulatorTimelineAction } from './CombatSimulatorTimeline';

export function WeaponDamageBuffEventRenderer({
  action,
}: {
  action: CombatSimulatorTimelineAction<WeaponDamageBuffEvent>;
}) {
  return (
    <Tooltip title={action.event.damageBuffDefinition.displayName}>
      <Box width="100%" height="100%"></Box>
    </Tooltip>
  );
}
