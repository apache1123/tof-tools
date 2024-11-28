import type { Weapon } from "../../weapon/weapon";
import type { TimeInterval } from "../time-interval/time-interval";
import { TimelineEvent } from "../timeline/timeline-event";

/** Represents the time interval when a weapon is on weapon switch cooldown */
export class WeaponSwitchCooldownEvent extends TimelineEvent {
  public constructor(
    timeInterval: TimeInterval,
    public readonly weapon: Weapon,
  ) {
    super(timeInterval);
  }
}
