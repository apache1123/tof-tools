import type { Charge } from '../charge/charge';
import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { EventData } from '../event/event-data';
import { EventHandler } from '../event/event-handler';
import type { TimeTracker } from '../time-tracker';
import type { Attack } from './attack';
import type { AttackAction } from './attack-action';
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

    if (this.attack.isPlayerInputAttack) {
      this.timeTracker.nextPlayerInputAttackTime = attackAction.endTime;
    }
    this.combatEventNotifier.notifyAttackStart(attackAction);

    this.notifyAttackHits(attackAction);

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

  private notifyAttackHits(attackAction: AttackAction) {
    for (const timeOfHit of attackAction.timeOfHits) {
      this.combatEventNotifier.notifyAttackHit(timeOfHit);
    }
  }
}
