import type { Serializable } from '../../persistable';
import type { AbilityEvent } from '../ability-timeline/ability-event';
import { Registry } from '../registry/registry';
import type { TimeInterval } from '../time-interval/time-interval';
import type { Ability } from './ability';
import type { AbilityId } from './ability-definition';
import type { AbilityRegistryDto } from './dtos/ability-registry-dto';

export class AbilityRegistry<
    TAbility extends Ability<TAbilityEvent>,
    TAbilityEvent extends AbilityEvent = AbilityEvent
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

  public getEvents(timeInterval: TimeInterval) {
    return this.items.flatMap((ability) =>
      ability.getEventsOverlappingInterval(timeInterval)
    );
  }

  public isActiveAt(id: AbilityId, time: number): boolean {
    const item = this.getItem(id);
    return !!item?.isActiveAt(time);
  }

  public getItemsNotOnCooldown(time: number) {
    return this.items.filter((ability) => !ability.isOnCooldownAt(time));
  }

  public toDto(): AbilityRegistryDto {
    const { items } = this;
    return { items: items.map((item) => item.toDto()), version: 1 };
  }
}
