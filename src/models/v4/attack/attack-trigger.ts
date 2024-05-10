import type { AttackEvent } from '../attack-timeline/attack-event';
import type { CombatEventNotifier } from '../event/combat-event-notifier';
import { EventHandler } from '../event/event-handler';
import type { TickTracker } from '../tick-tracker';
import type { WeaponTracker } from '../weapon-tracker/weapon-tracker';
import type { Attack } from './attack';

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

    // this possibly needs to be in a different tick than the attack
    this.switchWeaponsIfNeeded(tickStart);
    this.notifyActiveWeapon();

    const attackEvent = this.attack.trigger(tickStart);

    this.overwriteElementalType(attackEvent);
  }

  private switchWeaponsIfNeeded(time: number) {
    if (
      this.attack.isActiveWeaponAttack &&
      this.weaponTracker.getActiveWeapon(time) !== this.attack.weapon
    ) {
      this.weaponTracker.setActiveWeapon(this.attack.weapon, time);
    }
  }

  private notifyActiveWeapon() {
    if (this.attack.isActiveWeaponAttack && this.weaponTracker.activeWeapon)
      this.combatEventNotifier.notifyActiveWeapon(
        this.weaponTracker.activeWeapon
      );
  }

  private overwriteElementalType(attackEvent: AttackEvent) {
    if (
      this.attack.elementalType.followLastWeaponElementalType &&
      this.weaponTracker.previousWeapon
    ) {
      attackEvent.elementalType =
        this.weaponTracker.previousWeapon.damageElement;
    }

    if (
      this.attack.elementalType.followCurrentWeaponElementalType &&
      this.weaponTracker.activeWeapon
    ) {
      attackEvent.elementalType = this.weaponTracker.activeWeapon.damageElement;
    }
  }
}
