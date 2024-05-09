import type { Weapon } from '../../weapon';
import type { AttackId } from '../attack/attack-definition';
import type { AttackEvent } from '../attack-timeline/attack-event';
import type { BuffEvent } from '../buff-timeline/buff-event';
import type { ResourceEvent } from '../resource-timeline/resource-event';
import { eventIdProvider } from './event-id-provider';
import type { EventManager } from './event-manager';

export class CombatEventNotifier {
  public constructor(private readonly eventManager: EventManager) {}

  public notifyCombatStart() {
    this.eventManager.notify(eventIdProvider.getCombatStartEventId());
  }

  public notifyAttackRequest(attackId: AttackId) {
    this.eventManager.notify(eventIdProvider.getAttackRequestEventId(attackId));
  }

  public notifyAttackStart(attackEvent: AttackEvent) {
    const { attackId, elementalType, type, weapon, doesNotTriggerEvents } =
      attackEvent;

    if (doesNotTriggerEvents) return;

    const eventIds = [];

    if (type === 'skill') {
      eventIds.push(
        eventIdProvider.getStartOfAnySkillAttackEventId(),
        eventIdProvider.getStartOfSkillOfWeaponTypeEventId(weapon.type),
        eventIdProvider.getStartOfSkillOfElementalTypeEventId(elementalType)
      );
    } else if (type === 'discharge') {
      eventIds.push(  
        eventIdProvider.getStartOfAnyDischargeAttackEventId(),
        eventIdProvider.getStartOfDischargeOfWeaponTypeEventId(weapon.type),
        eventIdProvider.getStartOfDischargeOfElementalTypeEventId(elementalType)
      );
    }

    eventIds.push(
      eventIdProvider.getStartOfAnyAttackEventId(),
      eventIdProvider.getStartOfAttackEventId(attackId)
    );

    for (const eventId of eventIds) {
      this.eventManager.notify(eventId);
    }
  }

  public notifyAttackHit(attackEvent: AttackEvent) {
    this.eventManager.notify(eventIdProvider.getHitOfAnyAttackEventId());
    this.eventManager.notify(
      eventIdProvider.getHitOfWeaponEventId(attackEvent.weapon.id)
    );
  }

  public notifyAttackEnd(attackEvent: AttackEvent) {
    const { attackId, elementalType, type, weapon, doesNotTriggerEvents } =
      attackEvent;

    if (doesNotTriggerEvents) return;

    const eventIds = [];

    eventIds.push(
      eventIdProvider.getEndOfAnyAttackEventId(),
      eventIdProvider.getEndOfAttackEventId(attackId)
    );

    if (type === 'skill') {
      eventIds.push(
        eventIdProvider.getEndOfAnySkillAttackEventId(),
        eventIdProvider.getEndOfSkillOfWeaponTypeEventId(weapon.type),
        eventIdProvider.getEndOfSkillOfElementalTypeEventId(elementalType)
      );
    } else if (type === 'discharge') {
      eventIds.push(
        eventIdProvider.getEndOfAnyDischargeAttackEventId(),
        eventIdProvider.getEndOfDischargeOfWeaponTypeEventId(weapon.type),
        eventIdProvider.getEndOfDischargeOfElementalTypeEventId(elementalType)
      );
    }

    for (const eventId of eventIds) {
      this.eventManager.notify(eventId);
    }
  }

  public notifyActiveWeapon(weapon: Weapon) {
    this.eventManager.notify(eventIdProvider.getActiveWeaponEventId(weapon.id));
  }

  // TODO: not called anywhere
  public notifyWeaponFullCharge(weapon: Weapon) {
    this.eventManager.notify(
      eventIdProvider.getFullChargeOfWeaponEventId(weapon.id)
    );
  }

  public notifyBuffStart(buffEvent: BuffEvent) {
    this.eventManager.notify(
      eventIdProvider.getStartOfBuffEventId(buffEvent.buffId)
    );
  }

  public notifyBuffEnd(buffEvent: BuffEvent) {
    this.eventManager.notify(
      eventIdProvider.getEndOfBuffEventId(buffEvent.buffId)
    );
  }

  public notifyResourceUpdate(resourceEvent: ResourceEvent) {
    this.eventManager.notify(
      eventIdProvider.getResourceUpdateEventId(resourceEvent.resourceId)
    );
  }

  public notifyResourceDepleted(resourceEvent: ResourceEvent) {
    this.eventManager.notify(
      eventIdProvider.getResourceDepletedEventId(resourceEvent.resourceId)
    );
  }
}
