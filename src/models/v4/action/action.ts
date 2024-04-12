import type { TimePeriod } from '../time-period';
import { TimelineEvent } from '../timeline/timeline-event';

/** An action is anything a character does, spanning over a time period and has a cooldown. Attacks and buffs are all considered actions. */
export class Action extends TimelineEvent {
  public constructor(timePeriod: TimePeriod, public cooldown: number) {
    const { startTime, endTime } = timePeriod;
    super(startTime, endTime);
  }

  public get cooldownEndsAt() {
    return this.startTime + this.cooldown;
  }
}
