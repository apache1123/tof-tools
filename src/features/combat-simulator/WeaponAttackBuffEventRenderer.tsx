import { Box, Tooltip } from '@mui/material';

import type { WeaponAttackBuffEvent } from '../../models/v4/weapon-attack-buff-event';
import type { CombatSimulatorTimelineAction } from './CombatSimulatorTimeline';

export function WeaponAttackBuffEventRenderer({
  action,
}: {
  action: CombatSimulatorTimelineAction<WeaponAttackBuffEvent>;
}) {
  return (
    <Tooltip title={action.event.weaponAttackBuffDefinition.displayName}>
      <Box width="100%" height="100%"></Box>
    </Tooltip>
  );
}
