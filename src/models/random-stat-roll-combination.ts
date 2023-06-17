export interface RollCombination {
  numberOfRolls: number;
  rollStrength: number;
}

export function zeroRollCombination(): RollCombination {
  return { numberOfRolls: 0, rollStrength: undefined };
}
