import type {Dto} from "../dto";

/** @deprecated migrated to using Loadouts */
export interface ElementalUserStatsDto extends Dto {
  baseAttackFlatWithGearA: number;
  totalAttackFlatWithGearA: number;
  critFlatWithGearA: number;
  critPercentWithGearA: number;
  critDamageWithGearA: number;
  otherGearElementalDamage: number;
  miscAttackPercent: number;
  miscCritRate: number;
  miscCritDamage: number;
  version: 1;
}
