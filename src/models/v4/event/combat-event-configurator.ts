import type { Team } from '../../team';
import type { Weapon } from '../../weapon';
import type { ActionEndedBy } from '../action/action-ended-by';
import type { ActionTriggeredBy } from '../action/action-triggered-by';
import type { CombinedAttackRegistry } from '../attack/combined-attack-registry';
import type { WeaponTracker } from '../attack/weapon-tracker';
import type { BuffRegistry } from '../buff/buff-registry';
import type { ResourceRegistry } from '../resource/resource-registry';
import type { TickTracker } from '../tick-tracker';
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
    resourceRegistry: ResourceRegistry
  ) {
    for (const attack of attackRegistry.playerInputAttacks) {
      const {
        definition: { id },
      } = attack;
      eventManager.subscribe(
        eventIdProvider.getAttackRequestEventId(id),
        EventHandlerFactory.createHandlerToTriggerAttack(
          attack,
          team,
          tickTracker,
          weaponTracker,
          buffRegistry,
          resourceRegistry
        )
      );
    }

    const { weapons } = team;

    for (const attack of attackRegistry.triggeredAttacks) {
      const { definition } = attack;

      const eventIdsToTriggerAttackOn = this.getEventIdsToTriggerActionOn(
        definition.triggeredBy,
        weapons
      );
      const triggerAttackHandler =
        EventHandlerFactory.createHandlerToTriggerAttack(
          attack,
          team,
          tickTracker,
          weaponTracker,
          buffRegistry,
          resourceRegistry
        );
      for (const eventId of eventIdsToTriggerAttackOn) {
        eventManager.subscribe(eventId, triggerAttackHandler);
      }

      const eventIdsToEndAttackOn = this.getEventIdsToEndActionOn(
        definition.endedBy,
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
      const { definition } = buff;

      const eventIdsToTriggerBuffOn = this.getEventIdsToTriggerActionOn(
        definition.triggeredBy,
        weapons
      );
      const triggerBuffHandler = EventHandlerFactory.createHandlerToTriggerBuff(
        buff,
        team,
        tickTracker,
        weaponTracker,
        buffRegistry,
        resourceRegistry
      );
      for (const eventId of eventIdsToTriggerBuffOn) {
        eventManager.subscribe(eventId, triggerBuffHandler);
      }

      const eventIdsToEndBuffOn = this.getEventIdsToEndActionOn(
        definition.endedBy,
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
          eventIds.push(eventIdProvider.getWeaponFullChargeEventId(weapon.id));
        });
    }

    if (actionTriggeredBy.hitOfAnyWeapon) {
      eventIds.push(eventIdProvider.getAnyAttackHitEventId());
    }

    if (actionTriggeredBy.skillOfAnyWeapon) {
      eventIds.push(eventIdProvider.getSkillAttackEventId());
    }

    if (actionTriggeredBy.dischargeOfAnyWeapon) {
      eventIds.push(eventIdProvider.getDischargeAttackEventId());
    }

    if (actionTriggeredBy.skillOfWeaponType) {
      eventIds.push(
        eventIdProvider.getSkillOfWeaponTypeEventId(
          actionTriggeredBy.skillOfWeaponType
        )
      );
    }

    if (actionTriggeredBy.dischargeOfWeaponType) {
      eventIds.push(
        eventIdProvider.getDischargeOfWeaponTypeEventId(
          actionTriggeredBy.dischargeOfWeaponType
        )
      );
    }

    if (actionTriggeredBy.skillOfElementalType) {
      eventIds.push(
        eventIdProvider.getSkillOfElementalTypeEventId(
          actionTriggeredBy.skillOfElementalType
        )
      );
    }

    if (actionTriggeredBy.dischargeOfElementalType) {
      eventIds.push(
        eventIdProvider.getDischargeOfElementalTypeEventId(
          actionTriggeredBy.dischargeOfElementalType
        )
      );
    }

    if (actionTriggeredBy.buffStart) {
      eventIds.push(
        eventIdProvider.getBuffStartEventId(actionTriggeredBy.buffStart)
      );
    }

    if (actionTriggeredBy.weaponAttacks) {
      actionTriggeredBy.weaponAttacks.forEach((attackId) => {
        eventIds.push(eventIdProvider.getAttackEndEventId(attackId));
      });
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
      eventIds.push(eventIdProvider.getBuffEndEventId(actionEndedBy.buffEnd));
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

    return eventIds;
  }
}
