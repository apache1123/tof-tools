import { Stack } from "@mui/material";

import { weaponElementalTypes } from "../../../definitions/elemental-type";
import type {
  GearSummary,
  GearSummaryStatsForElement,
} from "../../../models/gear/gear-summary";
import type { GearSummaryStat } from "../../../models/gear/gear-summary-stat";
import type { PropsWithSx } from "../../__helpers__/props-with-sx";
import { StatDisplay } from "../../stat/StatDisplay/StatDisplay";

export interface GearSummaryProps extends PropsWithSx {
  summary: GearSummary;
  small?: boolean;
}

const statOrder: (keyof GearSummaryStatsForElement)[] = [
  "attackFlat",
  "attackPercent",
  "damagePercent",
];

export function GearSummary({ summary, small, sx }: GearSummaryProps) {
  return (
    <Stack direction="row" sx={{ gap: 2, flexWrap: "wrap", ...sx }}>
      {/* Show first attack flat by element, then attack percent by element, then damage percent by element */}
      {statOrder.map((statType) => {
        return weaponElementalTypes.map((element) => {
          const stats = summary.element[element];
          return (
            <StatItem
              key={`${statType}-${element}`}
              summaryStat={stats[statType]}
            />
          );
        });
      })}

      <StatItem summaryStat={summary.critFlat} />
      <StatItem summaryStat={summary.critPercent} />
    </Stack>
  );

  function StatItem({ summaryStat }: { summaryStat: GearSummaryStat }) {
    // Don't show 0 values
    return summaryStat.value === 0 ? null : (
      <StatDisplay {...summaryStat} iconSize={small ? 20 : undefined} />
    );
  }
}
