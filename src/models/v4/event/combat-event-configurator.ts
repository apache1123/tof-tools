import type { Team } from '../../team';
import type { Weapon } from '../../weapon';
import type { ActionTriggeredBy } from '../action/action-triggered-by';
import type { CombinedAttackRegistry } from '../attack/combined-attack-registry';
import type { WeaponTracker } from '../attack/weapon-tracker';
import type { BuffRegistry } from '../buff/buff-registry';
import type { Charge } from '../charge/charge';
import type { TimeTracker } from '../time-tracker';
import type { CombatEventNotifier } from './combat-event-notifier';
import { EventHandlerFactory } from './event-handler-factory';
import { eventIdProvider } from './event-id-provider';
import type { EventManager } from './event-manager';

// TODO: refactor this class
export class CombatEventConfigurator {
  public static configure(
    eventManager: EventManager,
    combatEventNotifier: CombatEventNotifier,
    team: Team,
    weaponTracker: WeaponTracker,
    timeTracker: TimeTracker,
    charge: Charge,
    attackRegistry: CombinedAttackRegistry,
    buffRegistry: BuffRegistry
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
          weaponTracker,
          timeTracker,
          charge,
          buffRegistry,
          combatEventNotifier
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
      const eventIdsToEndAttackOn = this.getEventIdsToEndActionOn(
        definition.triggeredBy,
        weapons
      );

      const triggerAttackHandler =
        EventHandlerFactory.createHandlerToTriggerAttack(
          attack,
          team,
          weaponTracker,
          timeTracker,
          charge,
          buffRegistry,
          combatEventNotifier
        );
      for (const eventId of eventIdsToTriggerAttackOn) {
        eventManager.subscribe(eventId, triggerAttackHandler);
      }

      const endAttackHandler = EventHandlerFactory.createHandlerToEndAttack(
        attack,
        combatEventNotifier
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
      const eventIdsToEndBuffOn = this.getEventIdsToEndActionOn(
        definition.triggeredBy,
        weapons
      );

      const triggerBuffHandler = EventHandlerFactory.createHandlerToTriggerBuff(
        buff,
        team,
        weaponTracker,
        charge,
        buffRegistry,
        combatEventNotifier
      );
      for (const eventId of eventIdsToTriggerBuffOn) {
        eventManager.subscribe(eventId, triggerBuffHandler);
      }

      const endBuffHandler = EventHandlerFactory.createHandlerToEndBuff(
        buff,
        combatEventNotifier
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
    const eventIdsToTriggerActionOn: string[] = [];

    if (actionTriggeredBy.combatStart) {
      eventIdsToTriggerActionOn.push(eventIdProvider.getCombatStartEventId());
    }

    if (actionTriggeredBy.notActiveWeapon) {
      weapons
        .filter((weapon) => weapon.id !== actionTriggeredBy.notActiveWeapon)
        .forEach((weapon) => {
          eventIdsToTriggerActionOn.push(
            eventIdProvider.getActiveWeaponEventId(weapon.id)
          );
        });
    }

    if (actionTriggeredBy.activeWeapon) {
      weapons
        .filter((weapon) => weapon.id === actionTriggeredBy.activeWeapon)
        .forEach((weapon) => {
          eventIdsToTriggerActionOn.push(
            eventIdProvider.getActiveWeaponEventId(weapon.id)
          );
        });
    }

    if (actionTriggeredBy.fullChargeOfWeapons) {
      weapons
        .filter((weapon) =>
          actionTriggeredBy.fullChargeOfWeapons?.includes(weapon.id)
        )
        .forEach((weapon) => {
          eventIdsToTriggerActionOn.push(
            eventIdProvider.getWeaponFullChargeEventId(weapon.id)
          );
        });
    }

    if (actionTriggeredBy.skillOfAnyWeapon) {
      eventIdsToTriggerActionOn.push(eventIdProvider.getSkillAttackEventId());
    }

    if (actionTriggeredBy.dischargeOfAnyWeapon) {
      eventIdsToTriggerActionOn.push(
        eventIdProvider.getDischargeAttackEventId()
      );
    }

    if (actionTriggeredBy.skillOfWeaponType) {
      eventIdsToTriggerActionOn.push(
        eventIdProvider.getSkillOfWeaponTypeEventId(
          actionTriggeredBy.skillOfWeaponType
        )
      );
    }

    if (actionTriggeredBy.dischargeOfWeaponType) {
      eventIdsToTriggerActionOn.push(
        eventIdProvider.getDischargeOfWeaponTypeEventId(
          actionTriggeredBy.dischargeOfWeaponType
        )
      );
    }

    if (actionTriggeredBy.skillOfElementalType) {
      eventIdsToTriggerActionOn.push(
        eventIdProvider.getSkillOfElementalTypeEventId(
          actionTriggeredBy.skillOfElementalType
        )
      );
    }

    if (actionTriggeredBy.dischargeOfElementalType) {
      eventIdsToTriggerActionOn.push(
        eventIdProvider.getDischargeOfElementalTypeEventId(
          actionTriggeredBy.dischargeOfElementalType
        )
      );
    }

    if (actionTriggeredBy.weaponAttacks) {
      actionTriggeredBy.weaponAttacks.forEach((attackId) => {
        eventIdsToTriggerActionOn.push(
          eventIdProvider.getAttackEndEventId(attackId)
        );
      });
    }

    return eventIdsToTriggerActionOn;
  }

  private static getEventIdsToEndActionOn(
    actionTriggeredBy: ActionTriggeredBy,
    weapons: Weapon[]
  ) {
    const eventIdsToEndActionOn: string[] = [];

    if (actionTriggeredBy.notActiveWeapon) {
      weapons
        .filter((weapon) => weapon.id === actionTriggeredBy.notActiveWeapon)
        .forEach((weapon) => {
          eventIdsToEndActionOn.push(
            eventIdProvider.getActiveWeaponEventId(weapon.id)
          );
        });
    }

    if (actionTriggeredBy.activeWeapon) {
      weapons
        .filter((weapon) => weapon.id !== actionTriggeredBy.activeWeapon)
        .forEach((weapon) => {
          eventIdsToEndActionOn.push(
            eventIdProvider.getActiveWeaponEventId(weapon.id)
          );
        });
    }

    return eventIdsToEndActionOn;
  }
}
