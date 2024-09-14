import { BarChart, cheerfulFiestaPalette } from '@mui/x-charts';
import { useRouter } from 'next/router';

import { routes } from '../../../routes/routes';
import type { WeaponName } from '../../definitions/weapons/weapon-definitions';
import type { WeaponBreakpointStars } from '../../definitions/weapons/weapon-stars';
import type { CombatSimulatorSnapshot } from '../../models/v4/combat-simulator/combat-simulator-snapshot';
import type { WeaponDto } from '../../models/weapon';
import { toShortNumberFormat } from '../../utils/locale-utils';

export interface SimulatorResult {
  snapshotPath: string;
  snapshot: CombatSimulatorSnapshot;
}

export interface BreakpointComparisonGroup {
  weaponBeingCompared: WeaponName;
  resultsByStars: Record<WeaponBreakpointStars, SimulatorResult>;
}

export interface CombatSimulatorResultComparisonProps {
  breakpointComparisonGroup: BreakpointComparisonGroup[];
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
  breakpointComparisonGroup,
}: CombatSimulatorResultComparisonProps) {
  const router = useRouter();

  // Sort snapshots within each comparison by stars ascending, mapping to an array
  const breakpointComparisonGroupsSorted = breakpointComparisonGroup.map(
    (breakpointComparison) => {
      const { weaponBeingCompared, resultsByStars } = breakpointComparison;
      const sortedResults = Object.keys(resultsByStars)
        .map(Number)
        .map((stars) => ({
          stars,
          result: resultsByStars[stars as WeaponBreakpointStars],
        }))
        .sort(({ stars: starsA }, { stars: starsB }) => starsA - starsB);

      const xLabels = sortedResults.map(({ stars }) => stars);

      const finalDamages = sortedResults.map(
        ({ result }) =>
          result.snapshot.damageSummary?.totalDamage.finalDamage ?? 0
      );

      return {
        weaponBeingCompared,
        results: sortedResults,
        xLabels,
        finalDamages,
      };
    }
  );

  return (
    <>
      <BarChart
        series={breakpointComparisonGroupsSorted.map(
          (breakpointComparisonGroup, index) => {
            const { weaponBeingCompared, finalDamages, results } =
              breakpointComparisonGroup;
            return {
              id: index,
              label: weaponBeingCompared,
              data: finalDamages,
              valueFormatter: (value, { dataIndex }) => {
                return `${toShortNumberFormat(value ?? 0)} (${weaponsToString(
                  results[dataIndex].result.snapshot.loadout.team.weapons ?? []
                )})`;
              },
              highlightScope: {
                highlighted: 'series',
                faded: 'global',
              },
            };
          }
        )}
        xAxis={breakpointComparisonGroupsSorted.map(({ xLabels }) => ({
          data: xLabels,
          scaleType: 'band',
          valueFormatter: (star) => starsToString(star),
        }))}
        yAxis={[
          { valueFormatter: (finalDamage) => toShortNumberFormat(finalDamage) },
        ]}
        onItemClick={(_, { seriesId, dataIndex }) => {
          const path =
            breakpointComparisonGroupsSorted[seriesId as number].results[
              dataIndex
            ].result.snapshotPath;
          router.push(`${routes.simulatorResults.path}/${path}`);
        }}
        width={400}
        height={400}
        colors={cheerfulFiestaPalette}
      />
    </>
  );
}
