import { RandomStatType } from './random-stat-type';
import { Stat } from './stat';

export interface RandomStat extends Omit<Stat, 'type'> {
  type: RandomStatType | undefined;
}

export function newEmptyRandomStat(): RandomStat {
  return { type: undefined, value: undefined };
}
