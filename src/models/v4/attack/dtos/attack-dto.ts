import type { AbilityDto } from '../../ability/dtos/ability-dto';
import type { AttackId } from '../attack-definition';

export interface AttackDto extends AbilityDto {
  id: AttackId;
}
