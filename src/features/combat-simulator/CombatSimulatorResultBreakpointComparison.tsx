import { BarChart, cheerfulFiestaPalette } from '@mui/x-charts';

import type { WeaponBreakpointStars } from '../../constants/weapon';
import type { WeaponName } from '../../constants/weapon-definitions';
import type { CombatSimulatorSnapshot } from '../../models/v4/combat-simulator/combat-simulator-snapshot';
import type { WeaponDto } from '../../models/weapon';
import { toShortNumberFormat } from '../../utils/locale-utils';

export type BreakpointComparison = {
  weaponBeingCompared: WeaponName;
  snapshots: Record<WeaponBreakpointStars, CombatSimulatorSnapshot>;
};

export interface CombatSimulatorResultComparisonProps {
  breakpointComparisons: BreakpointComparison[];
}

function starsToString(stars: number) {
  return `${stars} ⭐`;
}
function weaponsToString(weapons: WeaponDto[]) {
  // TODO: should the dto return a display name
  return weapons
    .map((weapon) => `${weapon.definitionId} ${starsToString(weapon.stars)}`)
    .join(',\n');
}

export function CombatSimulatorResultBreakpointComparison({
  breakpointComparisons,
}: CombatSimulatorResultComparisonProps) {
  // Sort snapshots within each comparison by stars ascending, mapping to an array
  const breakpointComparisonsSorted = breakpointComparisons.map(
    (breakpointComparison) => {
      const { weaponBeingCompared, snapshots } = breakpointComparison;
      const sortedSnapshots = Object.keys(snapshots)
        .map(Number)
        .map((stars) => ({
          stars,
          snapshot: snapshots[stars as WeaponBreakpointStars],
        }))
        .sort(({ stars: starsA }, { stars: starsB }) => starsA - starsB);

      const xLabels = sortedSnapshots.map(({ stars }) => stars);

      const finalDamages = sortedSnapshots.map(
        ({ snapshot }) => snapshot.damageSummary?.totalDamage.finalDamage ?? 0
      );

      return {
        weaponBeingCompared,
        snapshots: sortedSnapshots,
        xLabels,
        finalDamages,
      };
    }
  );

  return (
    <>
      <BarChart
        series={breakpointComparisonsSorted.map((breakpointComparison) => {
          const { weaponBeingCompared, finalDamages, snapshots } =
            breakpointComparison;
          return {
            label: weaponBeingCompared,
            data: finalDamages,
            valueFormatter: (value, { dataIndex }) => {
              return `${toShortNumberFormat(value ?? 0)} (${weaponsToString(
                snapshots[dataIndex].snapshot.loadout.team.weapons ?? []
              )})`;
            },
            highlightScope: {
              highlighted: 'series',
              faded: 'global',
            },
          };
        })}
        xAxis={breakpointComparisonsSorted.map(({ xLabels }) => ({
          data: xLabels,
          scaleType: 'band',
          valueFormatter: (star) => starsToString(star),
        }))}
        yAxis={[
          { valueFormatter: (finalDamage) => toShortNumberFormat(finalDamage) },
        ]}
        width={400}
        height={400}
        colors={cheerfulFiestaPalette}
      />
    </>
  );
}
