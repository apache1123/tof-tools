import type { Weapon } from '../../weapon';
import type { AttackAction } from '../attack/attack-action';
import type { AttackId } from '../attack/attack-definition';
import type { BuffAction } from '../buff/buff-action';
import type { EventData } from './event-data';
import { eventIdProvider } from './event-id-provider';
import type { EventManager } from './event-manager';

export class CombatEventNotifier {
  public constructor(private readonly eventManager: EventManager) {}

  public notifyAttackRequest(time: number, attackId: AttackId) {
    this.eventManager.notify(
      eventIdProvider.getAttackRequestEventId(attackId),
      {
        time,
      }
    );
  }

  public notifyAttackStart(attackAction: AttackAction) {
    const { startTime, attackId } = attackAction;

    const eventData: EventData = { time: startTime };

    if (startTime === 0) {
      this.eventManager.notify(
        eventIdProvider.getCombatStartEventId(),
        eventData
      );
    }
    this.eventManager.notify(
      eventIdProvider.getAttackStartEventId(attackId),
      eventData
    );
  }

  public notifyAttackHit(time: number) {
    this.eventManager.notify(eventIdProvider.getAnyAttackHitEventId(), {
      time,
    });
  }

  public notifyAttackEnd(attackAction: AttackAction) {
    const { endTime, attackId, elementalType, type, weapon } = attackAction;

    const eventData: EventData = { time: endTime };

    this.eventManager.notify(
      eventIdProvider.getAttackEndEventId(attackId),
      eventData
    );

    if (type === 'skill') {
      this.eventManager.notify(
        eventIdProvider.getSkillAttackEventId(),
        eventData
      );
      this.eventManager.notify(
        eventIdProvider.getSkillOfWeaponTypeEventId(weapon.type),
        eventData
      );
      this.eventManager.notify(
        eventIdProvider.getSkillOfElementalTypeEventId(elementalType),
        eventData
      );
    } else if (type === 'discharge') {
      this.eventManager.notify(
        eventIdProvider.getDischargeAttackEventId(),
        eventData
      );
      this.eventManager.notify(
        eventIdProvider.getDischargeOfWeaponTypeEventId(weapon.type),
        eventData
      );
      this.eventManager.notify(
        eventIdProvider.getDischargeOfElementalTypeEventId(elementalType),
        eventData
      );
    }
  }

  public notifyWeaponSwitch(time: number, weapon: Weapon) {
    this.eventManager.notify(
      eventIdProvider.getActiveWeaponEventId(weapon.id),
      {
        time,
      }
    );
  }

  public notifyWeaponFullCharge(time: number, weapon: Weapon) {
    this.eventManager.notify(
      eventIdProvider.getWeaponFullChargeEventId(weapon.id),
      { time }
    );
  }

  public notifyBuffStart(buffAction: BuffAction) {
    this.eventManager.notify(
      eventIdProvider.getBuffStartEventId(buffAction.buffId),
      { time: buffAction.startTime }
    );
  }

  public notifyBuffEnd(buffAction: BuffAction) {
    this.eventManager.notify(
      eventIdProvider.getBuffEndEventId(buffAction.buffId),
      {
        time: buffAction.endTime,
      }
    );
  }
}
