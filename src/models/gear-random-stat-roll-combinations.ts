import { RollCombination } from './random-stat-roll-combination';
import { StatName } from './stat-type';

export interface GearRandomStatRollCombinations {
  stars: number;
  randomStatRollCombinations: RandomStatRollCombination[];
}

export interface RandomStatRollCombination {
  randomStatName: StatName;
  rollCombination: RollCombination;
}
