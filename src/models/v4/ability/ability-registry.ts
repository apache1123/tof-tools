import type { Serializable } from '../../persistable';
import { Registry } from '../registry/registry';
import type { Ability } from './ability';
import type { AbilityId } from './ability-definition';
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

  public get lastEvent() {
    let result: TAbilityEvent | undefined;

    for (const item of this.items) {
      const lastEvent = item.lastEvent;
      // Assuming events are always chronological and will not overlap
      if (
        lastEvent &&
        (!result || (result && lastEvent.startTime > result.startTime))
      ) {
        result = lastEvent;
      }
    }

    return result;
  }

  public getActiveEvents() {
    return this.items.flatMap((ability) => ability.getActiveEvents());
  }

  public isActive(id: AbilityId): boolean {
    const item = this.getItem(id);
    return !!item?.isActive();
  }

  public toDto(): AbilityRegistryDto {
    const { items } = this;
    return { items: items.map((item) => item.toDto()), version: 1 };
  }
}
