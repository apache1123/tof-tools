import type { StatTypeId } from "../../definitions/stat-types";
import type { RollCombination } from "./random-stat-roll-combination";

export interface GearRandomStatRollCombinations {
  stars: number;
  randomStatRollCombinations: RandomStatRollCombination[];
}

export interface RandomStatRollCombination {
  randomStatId: StatTypeId;
  rollCombination: RollCombination;
}
