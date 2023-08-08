import type { RandomStat} from './random-stat';
import { newRandomStat } from './random-stat';
import type { StatType } from './stat-type';

// a.k.a. Augmentation stat, augment for short
export type AugmentStat = RandomStat;

export function newAugmentStat(type: StatType): AugmentStat {
  return newRandomStat(type);
}