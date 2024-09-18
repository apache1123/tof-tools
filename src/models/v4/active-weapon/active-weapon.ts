import type { Weapon } from '../../weapon';
import type { EventManager } from '../event/event-manager';
import type { CurrentTick } from '../tick/current-tick';
import { TimeInterval } from '../time-interval/time-interval';
import { ActiveWeaponEvent } from './active-weapon-event';
import type { ActiveWeaponTimeline } from './active-weapon-timeline';

export class ActiveWeapon {
  public constructor(
    private readonly timeline: ActiveWeaponTimeline,
    private readonly eventManager: EventManager,
    private readonly currentTick: CurrentTick
  ) {}

  /** The current active weapon */
  public get current(): Weapon | undefined {
    return this.getActiveWeaponEvent()?.weapon;
  }

  /** The previous weapon before switching to the current active weapon */
  public get previous(): Weapon | undefined {
    const lastEvent = this.getActiveWeaponEvent();
    if (!lastEvent) return undefined;

    return this.getLastEventBefore(lastEvent.startTime)?.weapon;
  }

  public set(weapon: Weapon) {
    if (this.current !== weapon) {
      this.timeline.addEvent(
        new ActiveWeaponEvent(
          new TimeInterval(
            this.currentTick.startTime,
            this.currentTick.endTime
          ),
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
