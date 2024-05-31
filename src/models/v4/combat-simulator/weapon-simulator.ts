import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { WeaponTracker } from '../weapon-tracker/weapon-tracker';

export class WeaponSimulator {
  public constructor(
    private readonly weaponTracker: WeaponTracker,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {}

  public simulate() {
    const activeWeapon = this.weaponTracker.activeWeapon;
    if (activeWeapon) {
      this.combatEventNotifier.notifyActiveWeapon(activeWeapon);
    }
  }
}
