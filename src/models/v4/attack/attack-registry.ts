import type { TimePeriod } from '../time-period';
import type { TimeTracker } from '../time-tracker';
import type { Attack } from './attack';
import type { AttackDefinition } from './attack-definition';
import type { AttackRegistryItem } from './attack-registry-item';

export class AttackRegistry {
  private readonly _items: AttackRegistryItem[];

  public constructor(items: AttackRegistryItem[]) {
    this._items = items;
  }

  public get items(): AttackRegistryItem[] {
    return this._items;
  }

  public getNextAttacksOffCooldown(timeTracker: TimeTracker) {
    return this.items.filter(
      (item) =>
        !item.attackTimeline.isActionOnCooldownAt(timeTracker.nextAttackTime)
    );
  }

  public getItem(attackDefinition: AttackDefinition) {
    return this._items.find(
      (item) => item.attackDefinition === attackDefinition
    );
  }

  public getAttacks(timePeriod: TimePeriod): Attack[] {
    const { startTime, endTime } = timePeriod;
    return this._items.flatMap((item) =>
      item.attackTimeline.getEventsOverlappingPeriod(startTime, endTime)
    );
  }

  public getLastAttack(): Attack | undefined {
    let result: Attack | undefined;

    for (const item of this._items) {
      const lastAttack = item.attackTimeline.lastEvent;
      // Assuming attacks are always chronological and will not overlap
      if (
        lastAttack &&
        (!result || (result && lastAttack.startTime > result.startTime))
      ) {
        result = lastAttack;
      }
    }

    return result;
  }
}
