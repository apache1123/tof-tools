import type { AttackType } from '../../../constants/attack-type';
import type { WeaponElementalType } from '../../../constants/elemental-type';
import type { Weapon } from '../../weapon';
import { Action } from '../action/action';
import type { AttackEvent } from '../attack-event/attack-event';
import type { AttackNotifier } from '../attack-event/attack-notifier';
import type { AttackRequest } from '../attack-request/attack-request';
import { eventIdProvider } from '../event/event-id-provider';
import { TimePeriod } from '../time-period';
import type { AttackDamageModifiers } from './attack-damage-modifiers';
import type { AttackDefinition, AttackId } from './attack-definition';

export class Attack extends Action {
  public attackId: AttackId;
  public elementalType: WeaponElementalType;
  public damageModifiers: AttackDamageModifiers;
  public type: AttackType;
  public charge: number;
  /** The weapon this attack derived from, for convenience */
  public weapon: Weapon;

  public constructor(
    definition: AttackDefinition,
    weapon: Weapon,
    attackRequest: AttackRequest
  ) {
    const {
      id,
      duration,
      cooldown,
      damageModifiers,
      elementalType,
      type,
      charge,
    } = definition;
    const { time, elementalTypeOverwrite } = attackRequest;

    const endTime = time + duration;
    const timePeriod = new TimePeriod(time, endTime);

    super(timePeriod, cooldown);

    const resolvedElementalType =
      elementalTypeOverwrite ?? elementalType.defaultElementalType;
    const damageModifiersCopy = { ...damageModifiers };

    this.attackId = id;
    this.elementalType = resolvedElementalType;
    this.damageModifiers = damageModifiersCopy;
    this.type = type;
    this.charge = charge;
    this.weapon = weapon;
  }

  public broadcast(notifier: AttackNotifier) {
    const { startTime, endTime, attackId, elementalType, type } = this;

    const attackStartEvent: AttackEvent = {
      time: startTime,
      attack: this,
    };
    const attackEndEvent: AttackEvent = {
      time: endTime,
      attack: this,
    };

    // Attack start events

    if (startTime === 0) {
      notifier.notify(
        eventIdProvider.getCombatStartEventId(),
        attackStartEvent
      );
    }
    notifier.notify(
      eventIdProvider.getAttackStartEventId(attackId),
      attackStartEvent
    );
    notifier.notify(
      eventIdProvider.getActionStartEventId(attackId),
      attackStartEvent
    );

    // Attack end events

    notifier.notify(
      eventIdProvider.getAttackEndEventId(attackId),
      attackEndEvent
    );
    notifier.notify(
      eventIdProvider.getActionEndEventId(attackId),
      attackEndEvent
    );

    if (type === 'skill') {
      notifier.notify(eventIdProvider.getSkillAttackEventId(), attackEndEvent);
      notifier.notify(
        eventIdProvider.getSkillOfWeaponTypeEventId(this.weapon.type),
        attackEndEvent
      );
      notifier.notify(
        eventIdProvider.getSkillOfElementalTypeEventId(elementalType),
        attackEndEvent
      );
    } else if (type === 'discharge') {
      notifier.notify(
        eventIdProvider.getDischargeAttackEventId(),
        attackEndEvent
      );
      notifier.notify(
        eventIdProvider.getDischargeOfWeaponTypeEventId(this.weapon.type),
        attackEndEvent
      );
      notifier.notify(
        eventIdProvider.getDischargeOfElementalTypeEventId(elementalType),
        attackEndEvent
      );
    }
  }
}
