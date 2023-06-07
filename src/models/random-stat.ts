import { RandomStatType } from './random-stat-type';
import { Stat } from './stat';

export interface RandomStat extends Stat {
  type: RandomStatType;
}

export function newEmptyRandomStat(): RandomStat {
  return { type: null, value: null };
}
