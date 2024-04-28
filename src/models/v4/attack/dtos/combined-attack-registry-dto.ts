import type { AttackDto } from './attack-dto';
import type { AttackRegistryDto } from './attack-registry-dto';

export interface CombinedAttackRegistryDto extends AttackRegistryDto {
  playerInputAttacks: AttackDto[];
  triggeredAttacks: AttackDto[];
}
