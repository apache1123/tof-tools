export interface StatType {
  id: StatName;
  displayName: string;
  inGameName: string;
  role: StatRole;
  elementalType: ElementalType;
  isPercentageBased: boolean;
  iconImageName: string;
  randomStatDefaultValue: number;
  randomStatMinRollValue: number;
  randomStatMaxRollValue: number;
}

export function isElementalAttackFlat(
  statType: StatType,
  elementalType: CoreElementalType
) {
  return (
    statType.role === StatRole.Attack &&
    (statType.elementalType === elementalType ||
      statType.elementalType === ElementalType.All)
  );
}

export function isElementalAttackPercent(
  statType: StatType,
  elementalType: CoreElementalType
) {
  return (
    statType.role === StatRole.AttackPercent &&
    (statType.elementalType === elementalType ||
      statType.elementalType === ElementalType.All)
  );
}

export function isCritFlat(statType: StatType) {
  return statType.role === StatRole.Crit;
}

export function isCritPercent(statType: StatType) {
  return statType.role === StatRole.CritPercent;
}

export function isElementalDamagePercent(
  statType: StatType,
  elementalType: CoreElementalType
) {
  return (
    statType.role === StatRole.DamagePercent &&
    (statType.elementalType === elementalType ||
      statType.elementalType === ElementalType.All)
  );
}

export enum StatName {
  AlteredAttack = 'Altered Attack',
  AlteredResistance = 'Altered Resistance',
  AlteredResistancePercent = 'Altered Resistance %',
  Attack = 'Attack',
  Crit = 'Crit',
  CritRatePercent = 'Crit Rate %',
  FlameAttack = 'Flame Attack',
  FlameAttackPercent = 'Flame Attack %',
  FlameDamagePercent = 'Flame Damage %',
  FlameResistance = 'Flame Resistance',
  FlameResistancePercent = 'Flame Resistance %',
  FrostAttack = 'Frost Attack',
  FrostAttackPercent = 'Frost Attack %',
  FrostDamagePercent = 'Frost Damage %',
  FrostResistance = 'Frost Resistance',
  FrostResistancePercent = 'Frost Resistance %',
  HP = 'HP',
  HPPercent = 'HP %',
  PhysicalAttack = 'Physical Attack',
  PhysicalAttackPercent = 'Physical Attack %',
  PhysicalDamagePercent = 'Physical Damage %',
  PhysicalResistance = 'Physical Resistance',
  PhysicalResistancePercent = 'Physical Resistance %',
  Resistance = 'Resistance',
  VoltAttack = 'Volt Attack',
  VoltAttackPercent = 'Volt Attack %',
  VoltDamagePercent = 'Volt Damage %',
  VoltResistance = 'Volt Resistance',
  VoltResistancePercent = 'Volt Resistance %',
}

export enum StatRole {
  Attack = 'Attack',
  AttackPercent = 'Attack %',
  DamagePercent = 'Damage %',
  Crit = 'Crit',
  CritPercent = 'Crit %',
  Resistance = 'Resistance',
  ResistancePercent = 'Resistance %',
  HP = 'HP',
  HPPercent = 'HP %',
}

export enum ElementalType {
  None = 'None', // For HP, etc.
  All = 'All', // For Attack, Resistance, etc.
  Altered = 'Altered',
  Flame = 'Flame',
  Frost = 'Frost',
  Physical = 'Physical',
  Volt = 'Volt',
}

export type CoreElementalType =
  | ElementalType.Flame
  | ElementalType.Frost
  | ElementalType.Physical
  | ElementalType.Volt;
