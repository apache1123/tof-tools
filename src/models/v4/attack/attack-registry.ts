import type { Serializable } from '../../persistable';
import { AbilityRegistry } from '../ability/ability-registry';
import type { AttackEvent } from '../attack-timeline/attack-event';
import type { Attack } from './attack';
import type { AttackRegistryDto } from './dtos/attack-registry-dto';

export class AttackRegistry
  extends AbilityRegistry<Attack, AttackEvent>
  implements Serializable<AttackRegistryDto> {}
