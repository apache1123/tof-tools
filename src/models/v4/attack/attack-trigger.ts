import type { EventData } from '../event/event-data';
import { EventHandler } from '../event/event-handler';
import type { TickTracker } from '../tick-tracker';
import type { Attack } from './attack';
import type { WeaponTracker } from './weapon-tracker';

export class AttackTrigger extends EventHandler {
  public constructor(
    private readonly attack: Attack,
    private readonly tickTracker: TickTracker,
    private readonly weaponTracker: WeaponTracker
  ) {
    super();
  }

  public handle(eventData: EventData) {
    this.triggerAttack(eventData);
    return super.handle(eventData);
  }

  private triggerAttack(eventData: EventData) {
    const tickStart = this.tickTracker.getNextClosestTickStart(eventData.time);

    // TODO: this possibly needs to be in a different tick than the attack
    this.switchWeaponsIfNeeded();

    this.attack.trigger(tickStart);
  }

  private switchWeaponsIfNeeded() {
    if (
      this.attack.isActiveWeaponAttack &&
      this.weaponTracker.activeWeapon !== this.attack.weapon
    ) {
      this.weaponTracker.setActiveWeapon(this.attack.weapon);
    }
  }
}
