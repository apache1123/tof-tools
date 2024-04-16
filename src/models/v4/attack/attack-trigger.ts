import type { Charge } from '../charge/charge';
import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { EventData } from '../event/event-data';
import { EventHandler } from '../event/event-handler';
import type { TimeTracker } from '../time-tracker';
import type { Attack } from './attack';
import type { WeaponTracker } from './weapon-tracker';

export class AttackTrigger extends EventHandler {
  public constructor(
    private readonly attack: Attack,
    private readonly weaponTracker: WeaponTracker,
    private readonly timeTracker: TimeTracker,
    private readonly charge: Charge,
    private readonly combatEventNotifier: CombatEventNotifier
  ) {
    super();
  }

  public handle(eventData: EventData) {
    this.triggerAttack(eventData);
    return super.handle(eventData);
  }

  private triggerAttack(eventData: EventData) {
    this.switchWeaponsIfNeeded(eventData);

    const { time } = eventData;
    const attackAction = this.attack.trigger(time);
    this.timeTracker.nextAttackTime = attackAction.endTime;
    this.combatEventNotifier.notifyAttackStart(attackAction);

    const fullChargeGained = this.charge.adjustCharge(attackAction);
    if (fullChargeGained) {
      this.combatEventNotifier.notifyWeaponFullCharge(
        attackAction.endTime,
        attackAction.weapon
      );
    }
  }

  private switchWeaponsIfNeeded(eventData: EventData) {
    if (
      this.attack.isActiveWeaponAttack &&
      this.weaponTracker.activeWeapon !== this.attack.weapon
    ) {
      this.weaponTracker.activeWeapon = this.attack.weapon;
      this.combatEventNotifier.notifyWeaponSwitch(
        eventData.time,
        this.attack.weapon
      );
    }
  }
}
