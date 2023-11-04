import type { RandomStatDto } from './random-stat';
import { RandomStat } from './random-stat';

// a.k.a. Augmentation stat, augment for short
export class AugmentStat extends RandomStat {}

export type AugmentStatDto = RandomStatDto;
