import { Box, Stack } from "@mui/material";
import { useState } from "react";

import type { WeaponDefinitionId } from "../../../definitions/weapons/weapon-definitions";
import type { DamageSummaryDto } from "../../../models/damage-summary/dtos/damage-summary-dto";
import { DamageSummaryBreakdownSideBar } from "./DamageSummaryBreakdownSideBar";
import { DamageSummaryBreakdownTable } from "./DamageSummaryBreakdownTable";
import { DamageSummaryBreakdownTopBar } from "./DamageSummaryBreakdownTopBar";

export function DamageSummaryBreakdown({
  damageSummary,
}: {
  damageSummary: DamageSummaryDto;
}) {
  const [selectedWeaponId, setSelectedWeaponId] = useState<
    WeaponDefinitionId | undefined
  >(damageSummary.damageByWeapon[0]?.weaponId ?? undefined);

  const { totalDamage, duration, damageByWeapon } = damageSummary;
  const selectedWeaponDamageSummary = damageByWeapon.find(
    ({ weaponId }) => weaponId === selectedWeaponId,
  );

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
          damagePercentageByWeapon={damageSummary.damageByWeapon.map(
            ({ weaponId, percentageOfTotalDamage }) => ({
              weaponId,
              percentageOfTotalDamage,
            }),
          )}
          selectedWeaponId={selectedWeaponId}
          onWeaponChange={(selectedWeaponId) => {
            setSelectedWeaponId(selectedWeaponId);
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
