import { StatType } from './stat-type';

export interface Stat {
  value: number | undefined;
  type: StatType | undefined;
}

export function newEmptyStat(): Stat {
  return { value: undefined, type: undefined };
}
