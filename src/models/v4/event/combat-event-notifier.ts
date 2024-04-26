import type { Weapon } from '../../weapon';
import type { AttackAction } from '../attack/attack-action';
import type { AttackId } from '../attack/attack-definition';
import type { BuffAction } from '../buff/buff-action';
import type { ResourceAction } from '../resource/resource-action';
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

  public notifyAttackStart(attackAction: AttackAction) {
    const { attackId, elementalType, type, weapon, doesNotTriggerEvents } =
      attackAction;

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

  public notifyAttackHit() {
    this.eventManager.notify(eventIdProvider.getHitOfAnyAttackEventId());
  }

  public notifyAttackEnd(attackAction: AttackAction) {
    const { attackId, elementalType, type, weapon, doesNotTriggerEvents } =
      attackAction;

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

  public notifyWeaponSwitch(weapon: Weapon) {
    this.eventManager.notify(eventIdProvider.getActiveWeaponEventId(weapon.id));
  }

  // TODO: not called anywhere
  public notifyWeaponFullCharge(weapon: Weapon) {
    this.eventManager.notify(
      eventIdProvider.getFullChargeOfWeaponEventId(weapon.id)
    );
  }

  public notifyBuffStart(buffAction: BuffAction) {
    this.eventManager.notify(
      eventIdProvider.getStartOfBuffEventId(buffAction.buffId)
    );
  }

  public notifyBuffEnd(buffAction: BuffAction) {
    this.eventManager.notify(
      eventIdProvider.getEndOfBuffEventId(buffAction.buffId)
    );
  }

  public notifyResourceUpdate(resourceAction: ResourceAction) {
    this.eventManager.notify(
      eventIdProvider.getResourceUpdateEventId(resourceAction.resourceId)
    );
  }

  public notifyResourceDepleted(resourceAction: ResourceAction) {
    this.eventManager.notify(
      eventIdProvider.getResourceDepletedEventId(resourceAction.resourceId)
    );
  }
}
