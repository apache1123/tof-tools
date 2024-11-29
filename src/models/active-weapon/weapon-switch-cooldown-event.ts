import type { TimeInterval } from "../time-interval/time-interval";
import { TimelineEvent } from "../timeline/timeline-event";
import type { Weapon } from "../weapon/weapon";

/** Represents the time interval when a weapon is on weapon switch cooldown */
export class WeaponSwitchCooldownEvent extends TimelineEvent {
  public constructor(
    timeInterval: TimeInterval,
    public readonly weapon: Weapon,
  ) {
    super(timeInterval);
  }
}
