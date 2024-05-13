import type { Serializable } from '../../persistable';
import type { AbilityEvent } from '../ability-timeline/ability-event';
import type { TimeInterval } from '../time-interval/time-interval';
import type { Ability } from './ability';
import type { AbilityId } from './ability-definition';
import type { AbilityRegistryDto } from './dtos/ability-registry-dto';

export class AbilityRegistry<
  TAbility extends Ability<TAbilityEvent>,
  TAbilityEvent extends AbilityEvent
> implements Serializable<AbilityRegistryDto>
{
  private readonly _items = new Map<AbilityId, TAbility>();

  public constructor(items: TAbility[]) {
    for (const item of items) {
      this._items.set(item.id, item);
    }
  }

  public get items() {
    return [...this._items.values()];
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
    const item = this._items.get(id);
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
