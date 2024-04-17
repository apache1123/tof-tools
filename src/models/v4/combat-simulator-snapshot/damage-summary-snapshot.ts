import type { WeaponName } from '../../../constants/weapon-definitions';

export interface DamageSnapshot {
  baseDamage: number;
  finalDamage: number;
  damageMultiplier: number;
}

export interface DamageSummarySnapshot {
  totalDamage: DamageSnapshot;
  damageByWeapon: {
    weaponName: WeaponName;
    percentageOfTotalDamage: number;
    totalDamage: DamageSnapshot;
    normalAttackDamage: DamageSnapshot;
    dodgeAttackDamage: DamageSnapshot;
    skillAttackDamage: DamageSnapshot;
    dischargeAttackDamage: DamageSnapshot;
    passiveAttackDamage: DamageSnapshot;
    otherAttackDamage: DamageSnapshot;
  }[];
  duration: number;
}
