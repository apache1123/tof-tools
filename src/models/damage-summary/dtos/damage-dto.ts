import type { Dto } from "../../../db/repository/dto";

export interface DamageDto extends Dto {
  baseDamage: number;
  finalDamage: number;
  damageMultiplier: number;
}
