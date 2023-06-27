import { StatType } from './stat-type';

export interface Stat {
  value: number | undefined;
  type: StatType | undefined;
}
