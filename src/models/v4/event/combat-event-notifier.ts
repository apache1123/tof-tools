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
    const { attackId } = attackAction;
    this.eventManager.notify(eventIdProvider.getAttackStartEventId(attackId));
  }

  public notifyAttackHit() {
    this.eventManager.notify(eventIdProvider.getAnyAttackHitEventId());
  }

  public notifyAttackEnd(attackAction: AttackAction) {
    const { attackId, elementalType, type, weapon } = attackAction;

    this.eventManager.notify(eventIdProvider.getAttackEndEventId(attackId));

    if (type === 'skill') {
      this.eventManager.notify(eventIdProvider.getSkillAttackEventId());
      this.eventManager.notify(
        eventIdProvider.getSkillOfWeaponTypeEventId(weapon.type)
      );
      this.eventManager.notify(
        eventIdProvider.getSkillOfElementalTypeEventId(elementalType)
      );
    } else if (type === 'discharge') {
      this.eventManager.notify(eventIdProvider.getDischargeAttackEventId());
      this.eventManager.notify(
        eventIdProvider.getDischargeOfWeaponTypeEventId(weapon.type)
      );
      this.eventManager.notify(
        eventIdProvider.getDischargeOfElementalTypeEventId(elementalType)
      );
    }
  }

  public notifyWeaponSwitch(weapon: Weapon) {
    this.eventManager.notify(eventIdProvider.getActiveWeaponEventId(weapon.id));
  }

  // TODO: not called anywhere
  public notifyWeaponFullCharge(weapon: Weapon) {
    this.eventManager.notify(
      eventIdProvider.getWeaponFullChargeEventId(weapon.id)
    );
  }

  public notifyBuffStart(buffAction: BuffAction) {
    this.eventManager.notify(
      eventIdProvider.getBuffStartEventId(buffAction.buffId)
    );
  }

  public notifyBuffEnd(buffAction: BuffAction) {
    this.eventManager.notify(
      eventIdProvider.getBuffEndEventId(buffAction.buffId)
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
