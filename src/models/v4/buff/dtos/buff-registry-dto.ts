import type { Dto } from '../../../dto';
import type { BuffDto } from './buff-dto';

export interface BuffRegistryDto extends Dto {
  buffs: BuffDto[];
}
