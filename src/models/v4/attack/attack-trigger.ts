import type { CombatEventNotifier } from '../event/combat-event-notifier';
import { EventHandler } from '../event/event-handler';
import type { TickTracker } from '../tick-tracker';
import type { Attack } from './attack';
import type { WeaponTracker } from './weapon-tracker';

export class AttackTrigger extends EventHandler {
  public constructor(
    private readonly attack: Attack,
    private readonly tickTracker: TickTracker,
    private readonly weaponTracker: WeaponTracker,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {
    super();
  }

  public handle() {
    this.triggerAttack();
    return super.handle();
  }

  private triggerAttack() {
    const tickStart = this.tickTracker.currentTickStart;

    // TODO: this possibly needs to be in a different tick than the attack
    this.switchWeaponsIfNeeded();
    this.attack.trigger(tickStart);
  }

  // Hmm perhaps WeaponTracker should have some kind of time awareness
  private switchWeaponsIfNeeded() {
    if (
      this.attack.isActiveWeaponAttack &&
      this.weaponTracker.activeWeapon !== this.attack.weapon
    ) {
      this.weaponTracker.setActiveWeapon(this.attack.weapon);
      this.combatEventNotifier.notifyWeaponSwitch(this.attack.weapon);
    }
  }
}
