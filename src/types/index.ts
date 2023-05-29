export * from './data-services';

export type Stat = {
  definition: StatDefinition;
  value: number;
};

export type StatDefinition = {
  name: StatName;
  // The name used in-game, used to OCR match.
  // Could be the same for two different types e.g. "Volt Atk%" & "Volt Atk" are both just "Volt Attack"
  inGameName: string;
  range: StatRange;
  type: StatType;
  element: Element;
  isPercentageBased?: boolean;
};

export type StatRange = {
  base: number;
  min: number;
  max: number;
};

export enum StatName {
  AlteredAttack = 'Altered Attack',
  AlteredResistance = 'Altered Resistance',
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

export enum StatType {
  Attack = 'Attack',
  AttackPercent = 'Attack%',
  DamagePercent = 'Damage%',
  Crit = 'Crit',
  CritPercent = 'Crit%',
  Resistance = 'Resistance',
  ResistancePercent = 'Resistance%',
  HP = 'HP',
  HPPercent = 'HP%',
}

export enum Element {
  None = 'None',
  Altered = 'Altered',
  Flame = 'Flame',
  Frost = 'Frost',
  Physical = 'Physical',
  Volt = 'Volt',
}
