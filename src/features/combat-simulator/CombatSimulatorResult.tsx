import { Stack } from '@mui/material';

import { DamageSummaryBreakdown } from '../../components/DamageSummaryBreakdown/DamageSummaryBreakdown';
import { WeaponDisplay } from '../../components/WeaponDisplay/WeaponDisplay';
import type { CombatSimulatorSnapshot } from '../../models/v4/combat-simulator/combat-simulator-snapshot';
import { CombatSimulatorTimeline } from './CombatSimulatorTimeline';

export interface CombatSimulatorResultProps {
  snapshot: CombatSimulatorSnapshot;
}

export function CombatSimulatorResult({
  snapshot,
}: CombatSimulatorResultProps) {
  return (
    <Stack spacing={5}>
      <Stack direction="row" spacing={5}>
        <Stack spacing={3} justifyContent="center">
          {snapshot.loadout.team.weapons.map((weapon, index) => (
            <WeaponDisplay
              weaponName={weapon.definitionId}
              stars={weapon.stars}
              key={index}
            />
          ))}
        </Stack>
        {snapshot.damageSummary && (
          <DamageSummaryBreakdown damageSummary={snapshot.damageSummary} />
        )}
      </Stack>
      <CombatSimulatorTimeline combatSimulatorSnapshot={snapshot} />
    </Stack>
  );
}
