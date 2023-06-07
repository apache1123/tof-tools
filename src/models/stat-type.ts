export interface StatType {
  name: StatName;
  inGameName: string;
  role: StatRole;
  elementalType: ElementalType;
  isPercentageBased?: boolean;
  iconImageName: string;
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
  None = 'None',
  Altered = 'Altered',
  Flame = 'Flame',
  Frost = 'Frost',
  Physical = 'Physical',
  Volt = 'Volt',
}
