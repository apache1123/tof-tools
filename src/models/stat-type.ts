import type {
  StatTypeElementalType,
  WeaponElementalType,
} from "../definitions/elemental-type";
import type { StatName, StatRole } from "../definitions/stat-types";

export interface StatType {
  id: StatName;
  displayName: string;
  shortDisplayName: string;
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
  elementalType: WeaponElementalType,
) {
  if (elementalType === "Altered")
    return (
      statType.role === "Attack" &&
      statType.elementalType === "Altered" &&
      statType.id === "Altered Attack"
    );

  return (
    statType.role === "Attack" &&
    (statType.elementalType === elementalType ||
      statType.elementalType === "All")
  );
}

export function isElementalAttackPercent(
  statType: StatType,
  elementalType: WeaponElementalType,
) {
  if (elementalType === "Altered")
    throw new Error("Altered attack % is not valid");

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
  elementalType: WeaponElementalType,
) {
  if (elementalType === "Altered")
    throw new Error("Altered damage % is not valid");

  return (
    statType.role === "Damage %" &&
    (statType.elementalType === elementalType ||
      statType.elementalType === "All")
  );
}

export function isHpFlat(statType: StatType) {
  return statType.role === "HP" && statType.id === "HP";
}

export function isHpPercent(statType: StatType) {
  return statType.role === "HP %" && statType.id === "HP %";
}

export function isResistanceFlat(
  statType: StatType,
  elementalType: WeaponElementalType,
) {
  return (
    statType.role === "Resistance" &&
    (statType.elementalType === elementalType ||
      statType.elementalType === "All")
  );
}

export function isResistancePercent(
  statType: StatType,
  elementalType: WeaponElementalType,
) {
  return (
    statType.role === "Resistance %" &&
    (statType.elementalType === elementalType ||
      statType.elementalType === "All")
  );
}
