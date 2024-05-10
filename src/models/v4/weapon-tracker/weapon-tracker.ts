import { minEventDuration } from '../../../constants/tick';
import type { Weapon } from '../../weapon';
import { TimeInterval } from '../time-interval/time-interval';
import { WeaponTrackerEvent } from './weapon-tracker-event';
import type { WeaponTrackerTimeline } from './weapon-tracker-timeline';

export class WeaponTracker {
  private readonly timeline: WeaponTrackerTimeline;

  private _activeWeapon: Weapon | undefined;
  private _previousWeapon: Weapon | undefined;

  public constructor(timeline: WeaponTrackerTimeline) {
    this.timeline = timeline;
  }

  /** The active weapon at the latest point of time */
  public get activeWeapon(): Weapon | undefined {
    return this._activeWeapon;
  }

  /** The previous weapon before switching to the latest active weapon */
  public get previousWeapon() {
    return this._previousWeapon;
  }

  /** Returns the active weapon at a point of time */
  public getActiveWeapon(time: number) {
    return this.timeline.getLatestEventBefore(time)?.weapon;
  }

  public setActiveWeapon(weapon: Weapon, time: number) {
    if (this._activeWeapon !== weapon) {
      this._previousWeapon = this._activeWeapon;
      this._activeWeapon = weapon;

      this.timeline.addEvent(
        new WeaponTrackerEvent(
          new TimeInterval(time, time + minEventDuration),
          weapon
        )
      );
    }
  }
}
