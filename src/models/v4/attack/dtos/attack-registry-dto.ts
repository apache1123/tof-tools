import type { AbilityRegistryDto } from '../../ability/dtos/ability-registry-dto';
import type { AttackDto } from './attack-dto';

export interface AttackRegistryDto extends AbilityRegistryDto {
  items: AttackDto[];
}
