import type { Serializable } from '../../persistable';
import { Registry } from '../registry/registry';
import type { Ability } from './ability';
import type { AbilityEvent } from './ability-event';
import type { AbilityRegistryDto } from './dtos/ability-registry-dto';

export class AbilityRegistry<
    TAbility extends Ability<TAbilityEvent>,
    TAbilityEvent extends AbilityEvent = AbilityEvent,
  >
  extends Registry<TAbility>
  implements Serializable<AbilityRegistryDto>
{
  public constructor(items: TAbility[]) {
    super(items);
  }

  public toDto(): AbilityRegistryDto {
    const { items } = this;
    return { items: items.map((item) => item.toDto()), version: 1 };
  }
}
