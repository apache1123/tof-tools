import { minEventDuration } from '../../../definitions/tick';
import type { Weapon } from '../../weapon';
import type { EventManager } from '../event/event-manager';
import type { CurrentTick } from '../tick/current-tick';
import { TimeInterval } from '../time-interval/time-interval';
import { CurrentWeaponEvent } from './current-weapon-event';
import type { CurrentWeaponTimeline } from './current-weapon-timeline';

export class CurrentWeapon {
  public constructor(
    private readonly timeline: CurrentWeaponTimeline,
    private readonly eventManager: EventManager,
    private readonly currentTick: CurrentTick
  ) {}

  /** The current active weapon */
  public get value(): Weapon | undefined {
    return this.getActiveWeaponEvent()?.weapon;
  }

  /** The previous weapon before switching to the current active weapon */
  public get previous(): Weapon | undefined {
    const lastEvent = this.getActiveWeaponEvent();
    if (!lastEvent) return undefined;

    return this.getLastEventBefore(lastEvent.startTime)?.weapon;
  }

  public set(weapon: Weapon) {
    if (this.value !== weapon) {
      const time = this.currentTick.startTime;
      this.timeline.addEvent(
        new CurrentWeaponEvent(
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
    return this.getLastEventBefore(this.currentTick.startTime);
  }

  private getLastEventBefore(time: number) {
    return this.timeline.getLatestEventBefore(time);
  }
}
