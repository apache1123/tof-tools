export interface RollCombination {
  numberOfRolls: number;
  rollStrength: number | undefined;
}

export function zeroRollCombination(): RollCombination {
  return { numberOfRolls: 0, rollStrength: undefined };
}
