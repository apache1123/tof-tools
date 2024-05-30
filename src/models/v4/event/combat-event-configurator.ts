import type { Team } from '../../team';
import type { Weapon } from '../../weapon';
import type { AbilityEndedBy } from '../ability/ability-ended-by';
import type { AbilityTriggerRegistry } from '../ability/ability-trigger-registry';
import type { AttackRegistry } from '../attack/attack-registry';
import type { BuffRegistry } from '../buff/buff-registry';
import { EventHandlerFactory } from './event-handler-factory';
import { AbilityTriggerEventHandler } from './event-handlers/ability-trigger-event-handler';
import { eventIdProvider } from './event-id-provider';
import type { EventManager } from './event-manager';

// TODO: refactor this class
// This class connects all attacks, buffs, resources, etc. to the event manager. Using their defined triggeredBy, endedBy, etc., each attack/buff/resource is subscribed to certain events (which will also be emitted from attacks/buffs/resources)
export class CombatEventConfigurator {
  public static configure(
    eventManager: EventManager,
    team: Team,
    attackRegistry: AttackRegistry,
    buffRegistry: BuffRegistry,
    abilityTriggerRegistry: AbilityTriggerRegistry
  ) {
    for (const abilityTrigger of abilityTriggerRegistry.items) {
      eventManager.subscribe(
        abilityTrigger.eventId,
        new AbilityTriggerEventHandler(abilityTrigger)
      );
    }

    const { weapons } = team;

    for (const attack of attackRegistry.passiveAttacks) {
      const { endedBy } = attack;

      const eventIdsToEndAttackOn = this.getEventIdsToEndAbilityOn(
        endedBy,
        weapons
      );
      const endAttackHandler =
        EventHandlerFactory.createHandlerToEndAbility(attack);
      for (const eventId of eventIdsToEndAttackOn) {
        eventManager.subscribe(eventId, endAttackHandler);
      }
    }

    for (const buff of buffRegistry.items) {
      const { endedBy } = buff;

      const eventIdsToEndBuffOn = this.getEventIdsToEndAbilityOn(
        endedBy,
        weapons
      );
      const endBuffHandler =
        EventHandlerFactory.createHandlerToEndAbility(buff);
      for (const eventId of eventIdsToEndBuffOn) {
        eventManager.subscribe(eventId, endBuffHandler);
      }
    }
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
