import type { Team } from '../../team';
import type { WeaponTracker } from '../attack/weapon-tracker';
import type { BuffRegistry } from '../buff/buff-registry';
import type { ChargeTimeline } from '../charge/charge-timeline';
import { EventHandlerFactory } from '../event/event-handler-factory';
import { eventIdProvider } from '../event/event-id-provider';
import type { EventNotifier } from '../event/event-notifier';
import { AttackEventHandlerFactory } from './attack-event-handler-factory';
import type { AttackNotifier } from './attack-notifier';

export class AttackNotifierConfigurator {
  public static configure(
    attackNotifier: AttackNotifier,
    team: Team,
    weaponTracker: WeaponTracker,
    chargeTimeline: ChargeTimeline,
    buffRegistry: BuffRegistry,
    eventNotifier: EventNotifier
  ) {
    const { weapons } = team;

    for (const [buffDefinition, buffTimeline] of buffRegistry.buffTimelines) {
      const { triggeredBy } = buffDefinition;

      const eventIdsToTriggerBuffOn: string[] = [];
      const eventIdsToEndBuffOn: string[] = [];

      if (triggeredBy.combatStart) {
        eventIdsToTriggerBuffOn.push(eventIdProvider.getCombatStartEventId());
      }

      if (triggeredBy.notActiveWeapon) {
        weapons
          .filter((weapon) => weapon.id !== triggeredBy.notActiveWeapon)
          .forEach((weapon) => {
            eventIdsToTriggerBuffOn.push(
              eventIdProvider.getActiveWeaponEventId(weapon.id)
            );
          });

        weapons
          .filter((weapon) => weapon.id === triggeredBy.notActiveWeapon)
          .forEach((weapon) => {
            eventIdsToEndBuffOn.push(
              eventIdProvider.getActiveWeaponEventId(weapon.id)
            );
          });
      }

      if (triggeredBy.activeWeapon) {
        weapons
          .filter((weapon) => weapon.id === triggeredBy.activeWeapon)
          .forEach((weapon) => {
            eventIdsToTriggerBuffOn.push(
              eventIdProvider.getActiveWeaponEventId(weapon.id)
            );
          });

        weapons
          .filter((weapon) => weapon.id !== triggeredBy.activeWeapon)
          .forEach((weapon) => {
            eventIdsToEndBuffOn.push(
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
            eventIdsToTriggerBuffOn.push(
              eventIdProvider.getWeaponFullChargeEventId(weapon.id)
            );
          });
      }

      if (triggeredBy.skillOfAnyWeapon) {
        eventIdsToTriggerBuffOn.push(eventIdProvider.getSkillAttackEventId());
      }

      if (triggeredBy.dischargeOfAnyWeapon) {
        eventIdsToTriggerBuffOn.push(
          eventIdProvider.getDischargeAttackEventId()
        );
      }

      if (triggeredBy.skillOfWeaponType) {
        eventIdsToTriggerBuffOn.push(
          eventIdProvider.getSkillOfWeaponTypeEventId(
            triggeredBy.skillOfWeaponType
          )
        );
      }

      if (triggeredBy.dischargeOfWeaponType) {
        eventIdsToTriggerBuffOn.push(
          eventIdProvider.getDischargeOfWeaponTypeEventId(
            triggeredBy.dischargeOfWeaponType
          )
        );
      }

      if (triggeredBy.skillOfElementalType) {
        eventIdsToTriggerBuffOn.push(
          eventIdProvider.getSkillOfElementalTypeEventId(
            triggeredBy.skillOfElementalType
          )
        );
      }

      if (triggeredBy.dischargeOfElementalType) {
        eventIdsToTriggerBuffOn.push(
          eventIdProvider.getDischargeOfElementalTypeEventId(
            triggeredBy.dischargeOfElementalType
          )
        );
      }

      if (triggeredBy.weaponAttacks) {
        triggeredBy.weaponAttacks.forEach((weaponAttack) => {
          eventIdsToTriggerBuffOn.push(weaponAttack);
        });
      }

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
}
