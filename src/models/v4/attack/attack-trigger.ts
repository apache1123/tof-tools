import type { CombatEventNotifier } from '../event/combat-event-notifier';
import type { EventData } from '../event/event-data';
import { EventHandler } from '../event/event-handler';
import type { ResourceRegistry } from '../resource/resource-registry';
import { TimePeriod } from '../time-period';
import type { TimeTracker } from '../time-tracker';
import type { Attack } from './attack';
import type { AttackAction } from './attack-action';
import type { WeaponTracker } from './weapon-tracker';

export class AttackTrigger extends EventHandler {
  public constructor(
    private readonly attack: Attack,
    private readonly weaponTracker: WeaponTracker,
    private readonly timeTracker: TimeTracker,
    private readonly resourceRegistry: ResourceRegistry,
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

    this.adjustResources(attackAction);
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

  /** Adjusts resources defined in the attack's definition, based off one attack action */
  private adjustResources(attackAction: AttackAction) {
    const { updatesResources } = this.attack;
    if (!updatesResources) return;

    for (const updatesResource of updatesResources) {
      const { resourceId, amount } = updatesResource;
      const resource = this.resourceRegistry.getResource(resourceId);
      if (!resource) {
        throw new Error(
          `Cannot find Resource to add to. ResourceId:${resourceId}, AttackId:${this.attack.id}`
        );
      }

      const resourceAction = resource.addResourceAction(
        new TimePeriod(attackAction.startTime, attackAction.endTime),
        amount
      );
      if (resourceAction) {
        this.combatEventNotifier.notifyResourceUpdate(resourceAction);
      }
    }
  }
}
