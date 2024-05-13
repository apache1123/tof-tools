import type { Serializable } from '../../persistable';
import { AbilityRegistry } from '../ability/ability-registry';
import type { BuffEvent } from '../buff-timeline/buff-event';
import type { Buff } from './buff';
import type { BuffRegistryDto } from './dtos/buff-registry-dto';

export class BuffRegistry
  extends AbilityRegistry<Buff, BuffEvent>
  implements Serializable<BuffRegistryDto>
{
  public toDto(): BuffRegistryDto {
    const { items } = this;
    return { ...super.toDto(), items: items.map((item) => item.toDto()) };
  }
}
