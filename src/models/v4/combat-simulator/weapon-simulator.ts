import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { TickTracker } from '../tick-tracker';
import type { WeaponTracker } from '../weapon-tracker/weapon-tracker';

export class WeaponSimulator {
  public constructor(
    private readonly tickTracker: TickTracker,
    private readonly weaponTracker: WeaponTracker,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {}

  public simulate() {
    const activeWeapon = this.weaponTracker.getActiveWeapon(
      this.tickTracker.currentTickStart
    );
    if (activeWeapon) {
      this.combatEventNotifier.notifyActiveWeapon(activeWeapon);
    }
  }
}
