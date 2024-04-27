import type { CombatEventNotifier } from '../event/combat-event-notifier';
import { EventHandler } from '../event/event-handler';
import type { TickTracker } from '../tick-tracker';
import type { Attack } from './attack';
import type { AttackAction } from './attack-action';
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
    this.notifyActiveWeapon();

    const attackAction = this.attack.trigger(tickStart);

    this.overwriteElementalType(attackAction);
  }

  // Hmm perhaps WeaponTracker should have some kind of time awareness
  private switchWeaponsIfNeeded() {
    if (
      this.attack.isActiveWeaponAttack &&
      this.weaponTracker.activeWeapon !== this.attack.weapon
    ) {
      this.weaponTracker.setActiveWeapon(this.attack.weapon);
    }
  }

  private notifyActiveWeapon() {
    if (this.attack.isActiveWeaponAttack && this.weaponTracker.activeWeapon)
      this.combatEventNotifier.notifyActiveWeapon(
        this.weaponTracker.activeWeapon
      );
  }

  private overwriteElementalType(attackAction: AttackAction) {
    if (
      this.attack.elementalType.followLastWeaponElementalType &&
      this.weaponTracker.previousWeapon
    ) {
      attackAction.elementalType =
        this.weaponTracker.previousWeapon.damageElement;
    }

    if (
      this.attack.elementalType.followCurrentWeaponElementalType &&
      this.weaponTracker.activeWeapon
    ) {
      attackAction.elementalType =
        this.weaponTracker.activeWeapon.damageElement;
    }
  }
}
