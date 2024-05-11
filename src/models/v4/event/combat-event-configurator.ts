import type { Team } from '../../team';
import type { Weapon } from '../../weapon';
import type { AbilityEndedBy } from '../ability/ability-ended-by';
import type { AbilityRequirementsChecker } from '../ability/ability-requirements-checker';
import type { AbilityTriggeredBy } from '../ability/ability-triggered-by';
import type { CombinedAttackRegistry } from '../attack/combined-attack-registry';
import type { BuffRegistry } from '../buff/buff-registry';
import type { ResourceRegistry } from '../resource/resource-registry';
import type { TickTracker } from '../tick-tracker';
import type { WeaponTracker } from '../weapon-tracker/weapon-tracker';
import type { CombatEventNotifier } from './combat-event-notifier';
import { EventHandlerFactory } from './event-handler-factory';
import { eventIdProvider } from './event-id-provider';
import type { EventManager } from './event-manager';

// TODO: refactor this class
// This class connects all attacks, buffs, resources, etc. to the event manager. Using their defined triggeredBy, endedBy, etc., each attack/buff/resource is subscribed to certain events (which will also be emitted from attacks/buffs/resources)
export class CombatEventConfigurator {
  public static configure(
    eventManager: EventManager,
    team: Team,
    tickTracker: TickTracker,
    weaponTracker: WeaponTracker,
    attackRegistry: CombinedAttackRegistry,
    buffRegistry: BuffRegistry,
    resourceRegistry: ResourceRegistry,
    requirementsChecker: AbilityRequirementsChecker,
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

      const eventIdsToTriggerAttackOn = this.getEventIdsToTriggerAbilityOn(
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

      const eventIdsToEndAttackOn = this.getEventIdsToEndAbilityOn(
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

      const eventIdsToTriggerBuffOn = this.getEventIdsToTriggerAbilityOn(
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

      const eventIdsToEndBuffOn = this.getEventIdsToEndAbilityOn(
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

  private static getEventIdsToTriggerAbilityOn(
    abilityTriggeredBy: AbilityTriggeredBy,
    weapons: Weapon[]
  ) {
    const eventIds: string[] = [];

    if (abilityTriggeredBy.combatStart) {
      eventIds.push(eventIdProvider.getCombatStartEventId());
    }

    if (abilityTriggeredBy.notActiveWeapon) {
      weapons
        .filter((weapon) => weapon.id !== abilityTriggeredBy.notActiveWeapon)
        .forEach((weapon) => {
          eventIds.push(eventIdProvider.getActiveWeaponEventId(weapon.id));
        });
    }

    if (abilityTriggeredBy.activeWeapon) {
      weapons
        .filter((weapon) => weapon.id === abilityTriggeredBy.activeWeapon)
        .forEach((weapon) => {
          eventIds.push(eventIdProvider.getActiveWeaponEventId(weapon.id));
        });
    }

    if (abilityTriggeredBy.fullChargeOfWeapons) {
      weapons
        .filter((weapon) =>
          abilityTriggeredBy.fullChargeOfWeapons?.includes(weapon.id)
        )
        .forEach((weapon) => {
          eventIds.push(
            eventIdProvider.getFullChargeOfWeaponEventId(weapon.id)
          );
        });
    }

    if (abilityTriggeredBy.startOfAnyAttack) {
      eventIds.push(eventIdProvider.getStartOfAnyAttackEventId());
    }
    if (abilityTriggeredBy.endOfAnyAttack) {
      eventIds.push(eventIdProvider.getEndOfAnyAttackEventId());
    }

    if (abilityTriggeredBy.startOfAttacks) {
      abilityTriggeredBy.startOfAttacks.forEach((attackId) => {
        eventIds.push(eventIdProvider.getStartOfAttackEventId(attackId));
      });
    }
    if (abilityTriggeredBy.endOfAttacks) {
      abilityTriggeredBy.endOfAttacks.forEach((attackId) => {
        eventIds.push(eventIdProvider.getEndOfAttackEventId(attackId));
      });
    }

    if (abilityTriggeredBy.startOfAnySkillAttack) {
      eventIds.push(eventIdProvider.getStartOfAnySkillAttackEventId());
    }
    if (abilityTriggeredBy.endOfAnySkillAttack) {
      eventIds.push(eventIdProvider.getEndOfAnySkillAttackEventId());
    }

    if (abilityTriggeredBy.startOfAnyDischargeAttack) {
      eventIds.push(eventIdProvider.getStartOfAnyDischargeAttackEventId());
    }
    if (abilityTriggeredBy.endOfAnyDischargeAttack) {
      eventIds.push(eventIdProvider.getEndOfAnyDischargeAttackEventId());
    }

    if (abilityTriggeredBy.startOfSkillOfWeaponType) {
      eventIds.push(
        eventIdProvider.getStartOfSkillOfWeaponTypeEventId(
          abilityTriggeredBy.startOfSkillOfWeaponType
        )
      );
    }
    if (abilityTriggeredBy.endOfSkillOfWeaponType) {
      eventIds.push(
        eventIdProvider.getEndOfSkillOfWeaponTypeEventId(
          abilityTriggeredBy.endOfSkillOfWeaponType
        )
      );
    }

    if (abilityTriggeredBy.startOfDischargeOfWeaponType) {
      eventIds.push(
        eventIdProvider.getStartOfDischargeOfWeaponTypeEventId(
          abilityTriggeredBy.startOfDischargeOfWeaponType
        )
      );
    }
    if (abilityTriggeredBy.endOfDischargeOfWeaponType) {
      eventIds.push(
        eventIdProvider.getEndOfDischargeOfWeaponTypeEventId(
          abilityTriggeredBy.endOfDischargeOfWeaponType
        )
      );
    }

    if (abilityTriggeredBy.startOfSkillOfElementalType) {
      eventIds.push(
        eventIdProvider.getStartOfSkillOfElementalTypeEventId(
          abilityTriggeredBy.startOfSkillOfElementalType
        )
      );
    }
    if (abilityTriggeredBy.endOfSkillOfElementalType) {
      eventIds.push(
        eventIdProvider.getEndOfSkillOfElementalTypeEventId(
          abilityTriggeredBy.endOfSkillOfElementalType
        )
      );
    }

    if (abilityTriggeredBy.startOfDischargeOfElementalType) {
      eventIds.push(
        eventIdProvider.getStartOfDischargeOfElementalTypeEventId(
          abilityTriggeredBy.startOfDischargeOfElementalType
        )
      );
    }
    if (abilityTriggeredBy.endOfDischargeOfElementalType) {
      eventIds.push(
        eventIdProvider.getEndOfDischargeOfElementalTypeEventId(
          abilityTriggeredBy.endOfDischargeOfElementalType
        )
      );
    }

    if (abilityTriggeredBy.hitOfAnyAttack) {
      eventIds.push(eventIdProvider.getHitOfAnyAttackEventId());
    }
    if (abilityTriggeredBy.hitOfWeapon) {
      eventIds.push(
        eventIdProvider.getHitOfWeaponEventId(abilityTriggeredBy.hitOfWeapon)
      );
    }

    if (abilityTriggeredBy.startOfBuff) {
      eventIds.push(
        eventIdProvider.getStartOfBuffEventId(abilityTriggeredBy.startOfBuff)
      );
    }
    if (abilityTriggeredBy.endOfBuff) {
      eventIds.push(
        eventIdProvider.getEndOfBuffEventId(abilityTriggeredBy.endOfBuff)
      );
    }

    if (abilityTriggeredBy.resourceUpdate) {
      eventIds.push(
        eventIdProvider.getResourceUpdateEventId(
          abilityTriggeredBy.resourceUpdate
        )
      );
    }

    return eventIds;
  }

  private static getEventIdsToEndAbilityOn(
    abilityEndedBy: AbilityEndedBy,
    weapons: Weapon[]
  ) {
    const eventIds: string[] = [];

    if (abilityEndedBy.buffEnd) {
      eventIds.push(
        eventIdProvider.getEndOfBuffEventId(abilityEndedBy.buffEnd)
      );
    }

    if (abilityEndedBy.notActiveWeapon) {
      weapons
        .filter((weapon) => weapon.id !== abilityEndedBy.notActiveWeapon)
        .forEach((weapon) => {
          eventIds.push(eventIdProvider.getActiveWeaponEventId(weapon.id));
        });
    }

    if (abilityEndedBy.activeWeapon) {
      weapons
        .filter((weapon) => weapon.id === abilityEndedBy.activeWeapon)
        .forEach((weapon) => {
          eventIds.push(eventIdProvider.getActiveWeaponEventId(weapon.id));
        });
    }

    if (abilityEndedBy.resourceDepleted) {
      eventIds.push(
        eventIdProvider.getResourceDepletedEventId(
          abilityEndedBy.resourceDepleted
        )
      );
    }

    return eventIds;
  }
}
