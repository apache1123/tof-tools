import type { Team } from '../../team';
import type { Weapon } from '../../weapon';
import type { TriggeredAction } from '../action/triggered-action';
import type { CombinedAttackRegistry } from '../attack/combined-attack-registry';
import type { WeaponTracker } from '../attack/weapon-tracker';
import { AttackEventHandlerFactory } from '../attack-event/attack-event-handler-factory';
import type { AttackNotifier } from '../attack-event/attack-notifier';
import { AttackRequestHandlerFactory } from '../attack-request/attack-request-handler-factory';
import type { AttackRequestNotifier } from '../attack-request/attack-request-notifier';
import type { BuffRegistry } from '../buff/buff-registry';
import type { ChargeTimeline } from '../charge/charge-timeline';
import type { TimeTracker } from '../time-tracker';
import { EventHandlerFactory } from './event-handler-factory';
import { eventIdProvider } from './event-id-provider';
import type { EventNotifier } from './event-notifier';

export class EventConfigurator {
  public static configure(
    attackRequestNotifier: AttackRequestNotifier,
    attackNotifier: AttackNotifier,
    eventNotifier: EventNotifier,
    team: Team,
    weaponTracker: WeaponTracker,
    timeTracker: TimeTracker,
    chargeTimeline: ChargeTimeline,
    combinedAttackRegistry: CombinedAttackRegistry,
    buffRegistry: BuffRegistry
  ) {
    for (const {
      attackDefinition,
      attackTimeline,
      weapon,
    } of combinedAttackRegistry.playerInputAttackItems) {
      const { id } = attackDefinition;
      attackRequestNotifier.subscribe(
        eventIdProvider.getAttackRequestEventId(id),
        AttackRequestHandlerFactory.createHandlerToTriggerAttack(
          attackDefinition,
          attackTimeline,
          weapon,
          team,
          weaponTracker,
          timeTracker,
          chargeTimeline,
          combinedAttackRegistry,
          buffRegistry,
          attackNotifier
        )
      );
    }

    const { weapons } = team;

    for (const {
      attackDefinition,
      attackTimeline,
      weapon,
    } of combinedAttackRegistry.triggeredAttackItems) {
      const eventIdsToTriggerAttackOn = this.getEventIdsToTriggerActionOn(
        attackDefinition,
        weapons
      );
      const eventIdsToEndAttackOn = this.getEventIdsToEndActionOn(
        attackDefinition,
        weapons
      );

      const triggerAttackHandler =
        AttackEventHandlerFactory.createHandlerToTriggerTriggeredAttack(
          attackDefinition,
          attackTimeline,
          weapon,
          team,
          weaponTracker,
          timeTracker,
          chargeTimeline,
          combinedAttackRegistry,
          buffRegistry,
          attackNotifier
        );
      for (const eventId of eventIdsToTriggerAttackOn) {
        attackNotifier.subscribe(eventId, triggerAttackHandler);
      }

      const endAttackHandler = EventHandlerFactory.createHandlerToEndAction(
        attackDefinition,
        attackTimeline,
        eventNotifier
      );
      for (const eventId of eventIdsToEndAttackOn) {
        attackNotifier.subscribe(eventId, endAttackHandler);
      }
    }

    for (const [buffDefinition, buffTimeline] of buffRegistry.buffTimelines) {
      const eventIdsToTriggerBuffOn = this.getEventIdsToTriggerActionOn(
        buffDefinition,
        weapons
      );
      const eventIdsToEndBuffOn = this.getEventIdsToEndActionOn(
        buffDefinition,
        weapons
      );

      const triggerBuffHandler =
        AttackEventHandlerFactory.createHandlerToTriggerBuffOffAttack(
          buffDefinition,
          buffTimeline,
          team,
          weaponTracker,
          chargeTimeline,
          buffRegistry,
          eventNotifier
        );
      for (const eventId of eventIdsToTriggerBuffOn) {
        attackNotifier.subscribe(eventId, triggerBuffHandler);
      }

      const endBuffHandler = EventHandlerFactory.createHandlerToEndAction(
        buffDefinition,
        buffTimeline,
        eventNotifier
      );
      for (const eventId of eventIdsToEndBuffOn) {
        attackNotifier.subscribe(eventId, endBuffHandler);
      }
    }
  }

  private static getEventIdsToTriggerActionOn(
    triggeredAction: TriggeredAction,
    weapons: Weapon[]
  ) {
    const { triggeredBy } = triggeredAction;
    const eventIdsToTriggerActionOn: string[] = [];

    if (triggeredBy.combatStart) {
      eventIdsToTriggerActionOn.push(eventIdProvider.getCombatStartEventId());
    }

    if (triggeredBy.notActiveWeapon) {
      weapons
        .filter((weapon) => weapon.id !== triggeredBy.notActiveWeapon)
        .forEach((weapon) => {
          eventIdsToTriggerActionOn.push(
            eventIdProvider.getActiveWeaponEventId(weapon.id)
          );
        });
    }

    if (triggeredBy.activeWeapon) {
      weapons
        .filter((weapon) => weapon.id === triggeredBy.activeWeapon)
        .forEach((weapon) => {
          eventIdsToTriggerActionOn.push(
            eventIdProvider.getActiveWeaponEventId(weapon.id)
          );
        });
    }

    if (triggeredBy.fullChargeOfWeapons) {
      weapons
        .filter((weapon) =>
          triggeredBy.fullChargeOfWeapons?.includes(weapon.id)
        )
        .forEach((weapon) => {
          eventIdsToTriggerActionOn.push(
            eventIdProvider.getWeaponFullChargeEventId(weapon.id)
          );
        });
    }

    if (triggeredBy.skillOfAnyWeapon) {
      eventIdsToTriggerActionOn.push(eventIdProvider.getSkillAttackEventId());
    }

    if (triggeredBy.dischargeOfAnyWeapon) {
      eventIdsToTriggerActionOn.push(
        eventIdProvider.getDischargeAttackEventId()
      );
    }

    if (triggeredBy.skillOfWeaponType) {
      eventIdsToTriggerActionOn.push(
        eventIdProvider.getSkillOfWeaponTypeEventId(
          triggeredBy.skillOfWeaponType
        )
      );
    }

    if (triggeredBy.dischargeOfWeaponType) {
      eventIdsToTriggerActionOn.push(
        eventIdProvider.getDischargeOfWeaponTypeEventId(
          triggeredBy.dischargeOfWeaponType
        )
      );
    }

    if (triggeredBy.skillOfElementalType) {
      eventIdsToTriggerActionOn.push(
        eventIdProvider.getSkillOfElementalTypeEventId(
          triggeredBy.skillOfElementalType
        )
      );
    }

    if (triggeredBy.dischargeOfElementalType) {
      eventIdsToTriggerActionOn.push(
        eventIdProvider.getDischargeOfElementalTypeEventId(
          triggeredBy.dischargeOfElementalType
        )
      );
    }

    if (triggeredBy.weaponAttacks) {
      triggeredBy.weaponAttacks.forEach((attackId) => {
        eventIdsToTriggerActionOn.push(
          eventIdProvider.getAttackEndEventId(attackId)
        );
      });
    }

    return eventIdsToTriggerActionOn;
  }

  private static getEventIdsToEndActionOn(
    triggeredAction: TriggeredAction,
    weapons: Weapon[]
  ) {
    const { triggeredBy } = triggeredAction;
    const eventIdsToEndActionOn: string[] = [];

    if (triggeredBy.notActiveWeapon) {
      weapons
        .filter((weapon) => weapon.id === triggeredBy.notActiveWeapon)
        .forEach((weapon) => {
          eventIdsToEndActionOn.push(
            eventIdProvider.getActiveWeaponEventId(weapon.id)
          );
        });
    }

    if (triggeredBy.activeWeapon) {
      weapons
        .filter((weapon) => weapon.id !== triggeredBy.activeWeapon)
        .forEach((weapon) => {
          eventIdsToEndActionOn.push(
            eventIdProvider.getActiveWeaponEventId(weapon.id)
          );
        });
    }

    return eventIdsToEndActionOn;
  }
}
