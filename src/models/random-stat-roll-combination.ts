export interface RollCombination {
  numberOfRolls: number;

  /** The average strength of each roll between the min roll value and the max roll value.
   *
   * i.e. For one roll, if rolled the min roll value, the strength is 0. If rolled the max roll value, the strength is 1.
   *
   * e.g. if min roll value is 100, max roll value is 200, and a roll is 150, then the strength of that roll is 0.5. */
  rollStrength: number;

  /** This is the sum of (the strength of each roll between 0 and the max roll value).
   *
   * This value is used to compare which stat rolled "higher"
   *
   * Slightly different calculation from the `rollStrength` property in that the `rollStrength` property normalizes the strength to be relative to the range of the min roll value and the max roll value, instead of 0 and the max roll value.
   *
   * e.g. max roll value = 100. First roll is 50, strength is 0.5. Second roll is 75, strength is 0.75. Total weight is 0.5 + 0.75 = 1.25
   *
   * Note that since we are unlikely to know the value of each roll, this is calculated by using the average strength of a single roll multiplied by the number of rolls
   */
  totalRollWeight: number;
}

export function zeroRollCombination(): RollCombination {
  return { numberOfRolls: 0, rollStrength: 0, totalRollWeight: 0 };
}
