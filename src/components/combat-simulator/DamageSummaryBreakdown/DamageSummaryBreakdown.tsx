import { Box, Stack } from "@mui/material";
import { useState } from "react";

import type { WeaponName } from "../../../definitions/weapons/weapon-definitions";
import type { DamageSummaryDto } from "../../../models/damage-summary/dtos/damage-summary-dto";
import { DamageSummaryBreakdownSideBar } from "./DamageSummaryBreakdownSideBar";
import { DamageSummaryBreakdownTable } from "./DamageSummaryBreakdownTable";
import { DamageSummaryBreakdownTopBar } from "./DamageSummaryBreakdownTopBar";

export function DamageSummaryBreakdown({
  damageSummary,
}: {
  damageSummary: DamageSummaryDto;
}) {
  const [selectedWeaponName, setSelectedWeaponName] = useState<
    WeaponName | undefined
  >(damageSummary.damageByWeapon[0]?.weaponName ?? undefined);

  const { totalDamage, duration, damageByWeapon } = damageSummary;
  const selectedWeaponDamageSummary = damageByWeapon.find(
    ({ weaponName }) => weaponName === selectedWeaponName,
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
            ({ weaponName, percentageOfTotalDamage }) => ({
              weaponName,
              percentageOfTotalDamage,
            }),
          )}
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
