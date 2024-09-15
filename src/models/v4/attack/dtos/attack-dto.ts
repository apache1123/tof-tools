import type { AttackId } from '../../../../definitions/types/attack/attack-ability';
import type { AbilityDto } from '../../ability/dtos/ability-dto';

export interface AttackDto extends AbilityDto {
  id: AttackId;
}
