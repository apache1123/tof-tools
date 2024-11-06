import type {
  CoreElementalType,
  StatTypeElementalType,
} from "../definitions/elemental-type";
import type { StatName, StatRole } from "../definitions/stat-types";

export interface StatType {
  id: StatName;
  displayName: string;
  inGameName: string;
  role: StatRole;
  elementalType: StatTypeElementalType;
  isPercentageBased: boolean;
  iconImageName: string;
  randomStatDefaultValue: number;
  randomStatMinRollValue: number;
  randomStatMaxRollValue: number;
  // Max augment increase = stat value * multiplier + flat
  maxAugmentIncreaseMultiplier: number;
  maxAugmentIncreaseFlat: number;
}

export function isElementalAttackFlat(
  statType: StatType,
  elementalType: CoreElementalType,
) {
  return (
    statType.role === "Attack" &&
    (statType.elementalType === elementalType ||
      statType.elementalType === "All")
  );
}

export function isElementalAttackPercent(
  statType: StatType,
  elementalType: CoreElementalType,
) {
  return (
    statType.role === "Attack %" &&
    (statType.elementalType === elementalType ||
      statType.elementalType === "All")
  );
}

export function isCritFlat(statType: StatType) {
  return statType.role === "Crit";
}

export function isCritPercent(statType: StatType) {
  return statType.role === "Crit %";
}

export function isElementalDamagePercent(
  statType: StatType,
  elementalType: CoreElementalType,
) {
  return (
    statType.role === "Damage %" &&
    (statType.elementalType === elementalType ||
      statType.elementalType === "All")
  );
}
