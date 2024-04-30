import type { Dto } from '../../../dto';
import type { AttackDto } from './attack-dto';

export interface AttackRegistryDto extends Dto {
  attacks: AttackDto[];
}
