import type { RandomStat } from "../../../../models/gear/random-stat";
import { StatDisplay } from "../StatDisplay/StatDisplay";

export interface RandomStatDisplayProps {
  randomStat: RandomStat;
}

export function RandomStatDisplay({ randomStat }: RandomStatDisplayProps) {
  const { type, totalValue } = randomStat;

  return (
    <StatDisplay
      typeRole={type.role}
      element={type.elementalType}
      displayName={type.shortDisplayName}
      value={totalValue}
      isPercentageBased={type.isPercentageBased}
    />
  );
}
