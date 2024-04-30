import type { Dto } from '../../../dto';

export interface DamageDto extends Dto {
  baseDamage: number;
  finalDamage: number;
  damageMultiplier: number;
}
