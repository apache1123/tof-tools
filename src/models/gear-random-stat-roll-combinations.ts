import type { RollCombination } from './random-stat-roll-combination';
import type { StatName } from './stat-type';

export interface GearRandomStatRollCombinations {
  stars: number;
  randomStatRollCombinations: RandomStatRollCombination[];
}

export interface RandomStatRollCombination {
  randomStatId: StatName;
  rollCombination: RollCombination;
}
