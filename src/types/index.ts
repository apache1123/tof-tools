export * from './data-services';

export type StatRange = {
  base: number;
  min: number;
  max: number;
};

export type Stat = {
  name: string;
  range: StatRange;
  type: StatType;
  element: Element;
};

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
