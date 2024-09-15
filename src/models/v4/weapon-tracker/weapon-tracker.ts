import { minEventDuration } from '../../../definitions/tick';
import type { Weapon } from '../../weapon';
import type { CombatContext } from '../combat-context/combat-context';
import type { EventManager } from '../event/event-manager';
import { TimeInterval } from '../time-interval/time-interval';
import { WeaponTrackerEvent } from './weapon-tracker-event';
import type { WeaponTrackerTimeline } from './weapon-tracker-timeline';

export class WeaponTracker {
  public constructor(
    private readonly timeline: WeaponTrackerTimeline,
    private readonly eventManager: EventManager,
    private readonly context: CombatContext
  ) {}

  /** The current active weapon */
  public getActiveWeapon(): Weapon | undefined {
    return this.getActiveWeaponEvent()?.weapon;
  }

  /** The previous weapon before switching to the current active weapon */
  public getPreviousWeapon(): Weapon | undefined {
    const lastEvent = this.getActiveWeaponEvent();
    if (!lastEvent) return undefined;

    return this.getLastEventBefore(lastEvent.startTime)?.weapon;
  }

  public setActiveWeapon(weapon: Weapon) {
    if (this.getActiveWeapon() !== weapon) {
      const time = this.context.currentTick.startTime;
      this.timeline.addEvent(
        new WeaponTrackerEvent(
          new TimeInterval(time, time + minEventDuration),
          weapon
        )
      );

      // TODO: does this need to fire every tick for some abilities to work?
      this.eventManager.publishActiveWeaponChanged({
        id: weapon.id,
        damageElement: weapon.damageElement,
      });
    }
  }

  private getActiveWeaponEvent() {
    return this.getLastEventBefore(this.context.currentTick.startTime);
  }

  private getLastEventBefore(time: number) {
    return this.timeline.getLatestEventBefore(time);
  }
}
