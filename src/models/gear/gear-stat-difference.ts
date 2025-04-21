import type {
  CoreElementalType,
  ElementalType,
} from "../../definitions/elemental-type";

export interface GearStatDifference {
  elementalAttackFlats: Record<ElementalType, number>;
  elementalAttackPercents: Record<CoreElementalType, number>;
  elementalDamagePercents: Record<CoreElementalType, number>;
  critRateFlat: number;
  critRatePercent: number;
  hpFlat: number;
  hpPercent: number;
  elementalResistanceFlats: Record<ElementalType, number>;
  elementalResistancePercents: Record<ElementalType, number>;
}
