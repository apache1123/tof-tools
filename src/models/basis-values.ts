// Basis values is the values of all the user stats and selected buffs, minus the values GearA contributes i.e. providing the common basis for comparing GearA & GearB
export interface BasisValues {
  basisAttackFlat: number;
  basisAttackPercent: number;
  basisCritFlat: number; // could maybe consider encapsulating these three crit values
  basisCritPercent: number;
  basisCritTotalPercent: number; // Crit % total = Crit flat converted to % + crit %
  basisCritDamage: number;
  basisDamage: number;
  basisPassiveAttackPercent: number; // Atk% buffs that show up in character sheet naturally, without active weapon/matrix buffs
  basisPassiveCritPercent: number; // Crit% buffs that show up in character sheet naturally, without active weapon/matrix buffs
  basisMultiplier: number;
}
