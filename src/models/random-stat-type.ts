import { StatType } from './stat-type';

export interface RandomStatType extends StatType {
  defaultValue: number;
  rollRange: RollRange;
}

export interface RollRange {
  minValue: number;
  maxValue: number;
}
