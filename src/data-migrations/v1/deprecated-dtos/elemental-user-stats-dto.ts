import type { Dto } from "../../../db/repository/dto";

/** @deprecated migrated to using Loadouts */
export interface ElementalUserStatsDtoV1 extends Dto {
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
