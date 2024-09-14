import { Timeline } from '../timeline/timeline';
import type { AbilityEvent } from './ability-event';

export class AbilityTimeline<
  T extends AbilityEvent = AbilityEvent,
> extends Timeline<T> {
  public constructor(endTime: number, startTime = 0) {
    super(endTime, startTime);
  }

  /** If any events are on cooldown at the time */
  public hasEventOnCooldownAt(time: number) {
    return this.getEventsAt(time).some((event) => event.isOnCooldown(time));
  }
}
