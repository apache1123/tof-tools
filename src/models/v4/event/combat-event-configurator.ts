import type { Team } from '../../team';
import type { Weapon } from '../../weapon';
import type { ActionEndedBy } from '../action/action-ended-by';
import type { ActionRequirementsChecker } from '../action/action-requirements-checker';
import type { ActionTriggeredBy } from '../action/action-triggered-by';
import type { CombinedAttackRegistry } from '../attack/combined-attack-registry';
import type { WeaponTracker } from '../attack/weapon-tracker';
import type { BuffRegistry } from '../buff/buff-registry';
import type { ResourceRegistry } from '../resource/resource-registry';
import type { TickTracker } from '../tick-tracker';
import type { CombatEventNotifier } from './combat-event-notifier';
import { EventHandlerFactory } from './event-handler-factory';
import { eventIdProvider } from './event-id-provider';
import type { EventManager } from './event-manager';

// TODO: refactor this class
export class CombatEventConfigurator {
  public static configure(
    eventManager: EventManager,
    team: Team,
    tickTracker: TickTracker,
    weaponTracker: WeaponTracker,
    attackRegistry: CombinedAttackRegistry,
    buffRegistry: BuffRegistry,
    resourceRegistry: ResourceRegistry,
    requirementsChecker: ActionRequirementsChecker,
    combatEventNotifier: CombatEventNotifier
  ) {
    for (const attack of attackRegistry.playerInputAttacks) {
      eventManager.subscribe(
        eventIdProvider.getAttackRequestEventId(attack.id),
        EventHandlerFactory.createHandlerToTriggerAttack(
          attack,
          tickTracker,
          weaponTracker,
          requirementsChecker,
          combatEventNotifier
        )
      );
    }

    const { weapons } = team;

    for (const attack of attackRegistry.triggeredAttacks) {
      const { triggeredBy, endedBy } = attack;

      const eventIdsToTriggerAttackOn = this.getEventIdsToTriggerActionOn(
        triggeredBy,
        weapons
      );
      const triggerAttackHandler =
        EventHandlerFactory.createHandlerToTriggerAttack(
          attack,
          tickTracker,
          weaponTracker,
          requirementsChecker,
          combatEventNotifier
        );
      for (const eventId of eventIdsToTriggerAttackOn) {
        eventManager.subscribe(eventId, triggerAttackHandler);
      }

      const eventIdsToEndAttackOn = this.getEventIdsToEndActionOn(
        endedBy,
        weapons
      );
      const endAttackHandler = EventHandlerFactory.createHandlerToEndAttack(
        attack,
        tickTracker
      );
      for (const eventId of eventIdsToEndAttackOn) {
        eventManager.subscribe(eventId, endAttackHandler);
      }
    }

    for (const buff of buffRegistry.buffs) {
      const { triggeredBy, endedBy } = buff;

      const eventIdsToTriggerBuffOn = this.getEventIdsToTriggerActionOn(
        triggeredBy,
        weapons
      );
      const triggerBuffHandler = EventHandlerFactory.createHandlerToTriggerBuff(
        buff,
        tickTracker,
        requirementsChecker
      );
      for (const eventId of eventIdsToTriggerBuffOn) {
        eventManager.subscribe(eventId, triggerBuffHandler);
      }

      const eventIdsToEndBuffOn = this.getEventIdsToEndActionOn(
        endedBy,
        weapons
      );
      const endBuffHandler = EventHandlerFactory.createHandlerToEndBuff(
        buff,
        tickTracker
      );
      for (const eventId of eventIdsToEndBuffOn) {
        eventManager.subscribe(eventId, endBuffHandler);
      }
    }
  }

  private static getEventIdsToTriggerActionOn(
    actionTriggeredBy: ActionTriggeredBy,
    weapons: Weapon[]
  ) {
    const eventIds: string[] = [];

    if (actionTriggeredBy.combatStart) {
      eventIds.push(eventIdProvider.getCombatStartEventId());
    }

    if (actionTriggeredBy.notActiveWeapon) {
      weapons
        .filter((weapon) => weapon.id !== actionTriggeredBy.notActiveWeapon)
        .forEach((weapon) => {
          eventIds.push(eventIdProvider.getActiveWeaponEventId(weapon.id));
        });
    }

    if (actionTriggeredBy.activeWeapon) {
      weapons
        .filter((weapon) => weapon.id === actionTriggeredBy.activeWeapon)
        .forEach((weapon) => {
          eventIds.push(eventIdProvider.getActiveWeaponEventId(weapon.id));
        });
    }

    if (actionTriggeredBy.fullChargeOfWeapons) {
      weapons
        .filter((weapon) =>
          actionTriggeredBy.fullChargeOfWeapons?.includes(weapon.id)
        )
        .forEach((weapon) => {
          eventIds.push(
            eventIdProvider.getFullChargeOfWeaponEventId(weapon.id)
          );
        });
    }

    if (actionTriggeredBy.hitOfAnyAttack) {
      eventIds.push(eventIdProvider.getHitOfAnyAttackEventId());
    }
    if (actionTriggeredBy.startOfAnyAttack) {
      eventIds.push(eventIdProvider.getStartOfAnyAttackEventId());
    }
    if (actionTriggeredBy.endOfAnyAttack) {
      eventIds.push(eventIdProvider.getEndOfAnyAttackEventId());
    }

    if (actionTriggeredBy.startOfAttacks) {
      actionTriggeredBy.startOfAttacks.forEach((attackId) => {
        eventIds.push(eventIdProvider.getStartOfAttackEventId(attackId));
      });
    }
    if (actionTriggeredBy.endOfAttacks) {
      actionTriggeredBy.endOfAttacks.forEach((attackId) => {
        eventIds.push(eventIdProvider.getEndOfAttackEventId(attackId));
      });
    }

    if (actionTriggeredBy.startOfAnySkillAttack) {
      eventIds.push(eventIdProvider.getStartOfAnySkillAttackEventId());
    }
    if (actionTriggeredBy.endOfAnySkillAttack) {
      eventIds.push(eventIdProvider.getEndOfAnySkillAttackEventId());
    }

    if (actionTriggeredBy.startOfAnyDischargeAttack) {
      eventIds.push(eventIdProvider.getStartOfAnyDischargeAttackEventId());
    }
    if (actionTriggeredBy.endOfAnyDischargeAttack) {
      eventIds.push(eventIdProvider.getEndOfAnyDischargeAttackEventId());
    }

    if (actionTriggeredBy.startOfSkillOfWeaponType) {
      eventIds.push(
        eventIdProvider.getStartOfSkillOfWeaponTypeEventId(
          actionTriggeredBy.startOfSkillOfWeaponType
        )
      );
    }
    if (actionTriggeredBy.endOfSkillOfWeaponType) {
      eventIds.push(
        eventIdProvider.getEndOfSkillOfWeaponTypeEventId(
          actionTriggeredBy.endOfSkillOfWeaponType
        )
      );
    }

    if (actionTriggeredBy.startOfDischargeOfWeaponType) {
      eventIds.push(
        eventIdProvider.getStartOfDischargeOfWeaponTypeEventId(
          actionTriggeredBy.startOfDischargeOfWeaponType
        )
      );
    }
    if (actionTriggeredBy.endOfDischargeOfWeaponType) {
      eventIds.push(
        eventIdProvider.getEndOfDischargeOfWeaponTypeEventId(
          actionTriggeredBy.endOfDischargeOfWeaponType
        )
      );
    }

    if (actionTriggeredBy.startOfSkillOfElementalType) {
      eventIds.push(
        eventIdProvider.getStartOfSkillOfElementalTypeEventId(
          actionTriggeredBy.startOfSkillOfElementalType
        )
      );
    }
    if (actionTriggeredBy.endOfSkillOfElementalType) {
      eventIds.push(
        eventIdProvider.getEndOfSkillOfElementalTypeEventId(
          actionTriggeredBy.endOfSkillOfElementalType
        )
      );
    }

    if (actionTriggeredBy.startOfDischargeOfElementalType) {
      eventIds.push(
        eventIdProvider.getStartOfDischargeOfElementalTypeEventId(
          actionTriggeredBy.startOfDischargeOfElementalType
        )
      );
    }
    if (actionTriggeredBy.endOfDischargeOfElementalType) {
      eventIds.push(
        eventIdProvider.getEndOfDischargeOfElementalTypeEventId(
          actionTriggeredBy.endOfDischargeOfElementalType
        )
      );
    }

    if (actionTriggeredBy.startOfBuff) {
      eventIds.push(
        eventIdProvider.getStartOfBuffEventId(actionTriggeredBy.startOfBuff)
      );
    }
    if (actionTriggeredBy.endOfBuff) {
      eventIds.push(
        eventIdProvider.getEndOfBuffEventId(actionTriggeredBy.endOfBuff)
      );
    }

    if (actionTriggeredBy.resourceUpdate) {
      eventIds.push(
        eventIdProvider.getResourceUpdateEventId(
          actionTriggeredBy.resourceUpdate
        )
      );
    }

    return eventIds;
  }

  private static getEventIdsToEndActionOn(
    actionEndedBy: ActionEndedBy,
    weapons: Weapon[]
  ) {
    const eventIds: string[] = [];

    if (actionEndedBy.buffEnd) {
      eventIds.push(eventIdProvider.getEndOfBuffEventId(actionEndedBy.buffEnd));
    }

    if (actionEndedBy.notActiveWeapon) {
      weapons
        .filter((weapon) => weapon.id !== actionEndedBy.notActiveWeapon)
        .forEach((weapon) => {
          eventIds.push(eventIdProvider.getActiveWeaponEventId(weapon.id));
        });
    }

    if (actionEndedBy.activeWeapon) {
      weapons
        .filter((weapon) => weapon.id === actionEndedBy.activeWeapon)
        .forEach((weapon) => {
          eventIds.push(eventIdProvider.getActiveWeaponEventId(weapon.id));
        });
    }

    if (actionEndedBy.resourceDepleted) {
      eventIds.push(
        eventIdProvider.getResourceDepletedEventId(
          actionEndedBy.resourceDepleted
        )
      );
    }

    return eventIds;
  }
}
