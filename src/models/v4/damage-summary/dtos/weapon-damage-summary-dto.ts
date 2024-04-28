import type { Dto } from '../../../dto';
import type { DamageDto } from './damage-dto';

export interface WeaponDamageSummaryDto extends Dto {
  totalDamage: DamageDto;
  normalAttackDamage: DamageDto;
  dodgeAttackDamage: DamageDto;
  skillAttackDamage: DamageDto;
  dischargeAttackDamage: DamageDto;
  passiveAttackDamage: DamageDto;
  otherAttackDamage: DamageDto;
}
