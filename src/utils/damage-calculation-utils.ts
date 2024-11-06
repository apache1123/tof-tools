import BigNumber from "bignumber.js";

import { defaultCritDamagePercent } from "../definitions/damage-formula";
import { sum } from "./math-utils";
import { calculateCritRatePercentFromFlat } from "./stat-calculation-utils";

// TODO: Split totalAttackPercent into gearAttackPercent and buffAttackPercent
export function calculateTotalAttack(
  baseAttack: BigNumber.Value,
  totalAttackPercent: BigNumber.Value,
) {
  return BigNumber(baseAttack).times(BigNumber(totalAttackPercent).plus(1));
}

export function calculateDamageMultiplier(
  attackFlat: BigNumber,
  attackPercent: BigNumber,
  critPercent: BigNumber,
  critDamagePercent: BigNumber,
  damagePercent: BigNumber,
): BigNumber {
  return calculateTotalAttack(attackFlat, attackPercent)
    .multipliedBy(critPercent.multipliedBy(critDamagePercent).plus(1))
    .multipliedBy(damagePercent.plus(1));
}

export function calculateTotalCritRatePercent(
  critRateFlat: BigNumber.Value,
  characterLevel: BigNumber.Value,
  gearCritRatePercent: BigNumber.Value,
  buffCritRatePercent: BigNumber.Value,
) {
  return sum(
    calculateCritRatePercentFromFlat(critRateFlat, characterLevel),
    gearCritRatePercent,
    buffCritRatePercent,
  );
}

export function calculateTotalCritDamagePercent(
  buffCritDamagePercent: BigNumber.Value,
) {
  return sum(defaultCritDamagePercent, buffCritDamagePercent);
}
