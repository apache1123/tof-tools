import { Box, Stack } from '@mui/material';
import { useState } from 'react';

import type { WeaponName } from '../../constants/weapon-definitions';
import type { DamageSummary } from '../../models/v4/damage-summary/damage-summary';
import { DamageSummaryBreakdownSideBar } from './DamageSummaryBreakdownSideBar';
import { DamageSummaryBreakdownTable } from './DamageSummaryBreakdownTable';
import { DamageSummaryBreakdownTopBar } from './DamageSummaryBreakdownTopBar';

export function DamageSummaryBreakdown({
  damageSummary,
}: {
  damageSummary: DamageSummary;
}) {
  const [selectedWeaponName, setSelectedWeaponName] = useState<WeaponName>(
    damageSummary.weaponDamageSummaries.keys().next().value
  );

  const {
    totalDamage,
    duration,
    damagePercentageByWeapon,
    weaponDamageSummaries,
  } = damageSummary;
  const selectedWeaponDamageSummary =
    weaponDamageSummaries.get(selectedWeaponName);

  return (
    <Stack spacing={1} width={600}>
      <DamageSummaryBreakdownTopBar
        totalBaseDamage={totalDamage.baseDamage}
        totalFinalDamage={totalDamage.finalDamage}
        totalMultiplier={totalDamage.damageMultiplier}
        duration={duration}
      />
      <Stack direction="row">
        <DamageSummaryBreakdownSideBar
          damagePercentageByWeapon={damagePercentageByWeapon}
          selectedWeaponName={selectedWeaponName}
          onWeaponChange={(selectedWeaponName) => {
            setSelectedWeaponName(selectedWeaponName);
          }}
        />
        <Box width={450}>
          {selectedWeaponDamageSummary && (
            <DamageSummaryBreakdownTable
              weaponDamageSummary={selectedWeaponDamageSummary}
            />
          )}
        </Box>
      </Stack>
    </Stack>
  );
}
