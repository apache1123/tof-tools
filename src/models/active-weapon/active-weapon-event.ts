import type { TimeInterval } from "../time-interval/time-interval";
import { TimelineEvent } from "../timeline/timeline-event";
import type { Weapon } from "../weapon/weapon";

export class ActiveWeaponEvent extends TimelineEvent {
  public constructor(
    timeInterval: TimeInterval,
    public readonly weapon: Weapon,
  ) {
    super(timeInterval);
  }
}
