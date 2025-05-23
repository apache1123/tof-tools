import type {
  ElementalType,
  StatTypeElementalType,
} from "../../definitions/elemental-type";
import type { StatRole, StatTypeId } from "../../definitions/stat-types";

export interface StatType {
  id: StatTypeId;
  displayName: string;
  shortDisplayName: string;
  inGameName: string;
  role: StatRole;
  elementalType: StatTypeElementalType;
  isPercentageBased: boolean;
  randomStatDefaultValue: number;
  randomStatMinRollValue: number;
  randomStatMaxRollValue: number;
  // Max augment increase = stat value * multiplier + flat
  maxAugmentIncreaseMultiplier: number;
  maxAugmentIncreaseFlat: number;
}

export function isElementalAttackFlat(
  statType: StatType,
  elementalType: ElementalType,
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
  elementalType: ElementalType,
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
  elementalType: ElementalType,
) {
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
  elementalType: ElementalType,
) {
  return (
    statType.role === "Resistance" &&
    (statType.elementalType === elementalType ||
      statType.elementalType === "All")
  );
}

export function isResistancePercent(
  statType: StatType,
  elementalType: ElementalType,
) {
  return (
    statType.role === "Resistance %" &&
    (statType.elementalType === elementalType ||
      statType.elementalType === "All")
  );
}
