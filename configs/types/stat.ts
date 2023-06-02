export type StatName =
  | 'Altered Attack'
  | 'Altered Resistance'
  | 'Altered Resistance %'
  | 'Attack'
  | 'Crit'
  | 'Crit Rate %'
  | 'Flame Attack'
  | 'Flame Attack %'
  | 'Flame Damage %'
  | 'Flame Resistance'
  | 'Flame Resistance %'
  | 'Frost Attack'
  | 'Frost Attack %'
  | 'Frost Damage %'
  | 'Frost Resistance'
  | 'Frost Resistance %'
  | 'HP'
  | 'HP %'
  | 'Physical Attack'
  | 'Physical Attack %'
  | 'Physical Damage %'
  | 'Physical Resistance'
  | 'Physical Resistance %'
  | 'Resistance'
  | 'Volt Attack'
  | 'Volt Attack %'
  | 'Volt Damage %'
  | 'Volt Resistance'
  | 'Volt Resistance %';

export type StatRole =
  | 'Attack'
  | 'Attack %'
  | 'Damage %'
  | 'Crit'
  | 'Crit %'
  | 'Resistance'
  | 'Resistance %'
  | 'HP'
  | 'HP %';

export type ElementalType =
  | 'None'
  | 'Altered'
  | 'Flame'
  | 'Frost'
  | 'Physical'
  | 'Volt';

export interface StatType {
  name: StatName;
  // The name used in-game, used to OCR match.
  // Could be the same for two different types e.g. "Volt Atk%" & "Volt Atk" are both just "Volt Attack"
  inGameName: string;
  role: StatRole;
  elementalType: ElementalType;
  isPercentageBased?: boolean;
  iconImageName: string;
}

export interface RandomStatType {
  name: StatName;
  defaultValue: number;
  rollRange: RollRange;
}

export interface RollRange {
  minValue: number;
  maxValue: number;
}
