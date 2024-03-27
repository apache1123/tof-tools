import type { WeaponElementalType } from '../../../constants/elemental-type';
import { TimelineEvent } from '../timeline/timeline-event';

export class Attack extends TimelineEvent {
  public constructor(
    public startTime: number,
    public duration: number,
    public cooldown: number,
    public elementalType: WeaponElementalType
  ) {
    super(startTime, duration);
  }

  public get cooldownEndsAt() {
    return this.startTime + this.cooldown;
  }
}
