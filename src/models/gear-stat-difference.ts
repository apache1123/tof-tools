import type {
  CoreElementalType,
  WeaponElementalType,
} from "../definitions/elemental-type";

export interface GearStatDifference {
  elementalAttackFlats: Record<WeaponElementalType, number>;
  elementalAttackPercents: Record<CoreElementalType, number>;
  elementalDamagePercents: Record<CoreElementalType, number>;
  critRateFlat: number;
  critRatePercent: number;
  hpFlat: number;
  hpPercent: number;
  elementalResistanceFlats: Record<WeaponElementalType, number>;
  elementalResistancePercents: Record<WeaponElementalType, number>;
}
