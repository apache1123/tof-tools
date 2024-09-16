import type { Weapon } from '../../weapon';
import type { TimeInterval } from '../time-interval/time-interval';
import { TimelineEvent } from '../timeline/timeline-event';

export class CurrentWeaponEvent extends TimelineEvent {
  public readonly weapon: Weapon;

  public constructor(timeInterval: TimeInterval, weapon: Weapon) {
    super(timeInterval);
    this.weapon = weapon;
  }
}
