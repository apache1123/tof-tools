import { minEventDuration } from '../../../constants/tick';
import type { Weapon } from '../../weapon';
import type { TickTracker } from '../tick-tracker';
import { TimeInterval } from '../time-interval/time-interval';
import { WeaponTrackerEvent } from './weapon-tracker-event';
import type { WeaponTrackerTimeline } from './weapon-tracker-timeline';

export class WeaponTracker {
  public constructor(
    private readonly timeline: WeaponTrackerTimeline,
    private readonly tickTracker: TickTracker
  ) {}

  /** The active weapon at the start of the current tick */
  public get activeWeapon(): Weapon | undefined {
    return this.timeline.lastEvent?.weapon;
  }

  /** The previous weapon before switching to the current active weapon, at the start of the current tick */
  public get previousWeapon(): Weapon | undefined {
    const lastEvent = this.timeline.lastEvent;
    if (!lastEvent) return undefined;

    return this.timeline.getLatestEventBefore(lastEvent.startTime)?.weapon;
  }

  public setActiveWeapon(weapon: Weapon) {
    if (this.activeWeapon !== weapon) {
      const time = this.tickTracker.currentTickStart;
      this.timeline.addEvent(
        new WeaponTrackerEvent(
          new TimeInterval(time, time + minEventDuration),
          weapon
        )
      );
    }
  }
}
