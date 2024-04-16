import { TimePeriod } from '../time-period';

/** An action is anything a character does, spanning over a time period and has a cooldown. Attacks and buffs are all considered actions. */
export class Action extends TimePeriod {
  public constructor(timePeriod: TimePeriod, public cooldown: number) {
    const { startTime, endTime } = timePeriod;
    super(startTime, endTime);
  }

  public get cooldownEndsAt() {
    return this.startTime + this.cooldown;
  }
}
