import type { Loadout } from '../../loadout';
import type { Team } from '../../team';
import { AttackFactory } from '../attack/attack-factory';
import { BuffFactory } from '../buff/buff-factory';
import type { BuffRegistry } from '../buff/buff-registry';
import { eventIdProvider } from '../event/event-id-provider';
import type { Relics } from '../relics/relics';
import type { ResourceRegistry } from '../resource/resource-registry';
import type { WeaponTracker } from '../weapon-tracker/weapon-tracker';
import type { Ability } from './ability';
import type { AbilityDefinition } from './ability-definition';
import type { AbilityRegistry } from './ability-registry';
import { AbilityTrigger } from './ability-trigger';

export class AbilityTriggerFactory {
  public static createAbilityTriggers(
    loadout: Loadout,
    relics: Relics,
    weaponTracker: WeaponTracker,
    resourceRegistry: ResourceRegistry,
    buffRegistry: BuffRegistry,
    abilityRegistry: AbilityRegistry<Ability>
  ): AbilityTrigger[] {
    const attackDefinitions = AttackFactory.getDefinitions(loadout.team);
    const buffDefinitions = BuffFactory.getDefinitions(loadout, relics);

    return [...attackDefinitions, ...buffDefinitions].flatMap((definition) => {
      const ability = abilityRegistry.getItem(definition.id);
      if (!ability) return [];

      return this.getEventIdsToSubscribeTo(definition, loadout.team).map(
        (eventId) => {
          const { triggeredBy } = definition;
          return new AbilityTrigger(
            eventId,
            !!triggeredBy.playerInput,
            triggeredBy.requirements,
            ability,
            loadout.team,
            weaponTracker,
            buffRegistry,
            resourceRegistry
          );
        }
      );
    });
  }

  private static getEventIdsToSubscribeTo(
    abilityDefinition: AbilityDefinition,
    team: Team
  ) {
    const eventIds: string[] = [];

    const { triggeredBy } = abilityDefinition;
    const { weapons } = team;

    if (triggeredBy.playerInput) {
      eventIds.push(
        eventIdProvider.getAbilityRequestEventId(abilityDefinition.id)
      );
    }

    if (triggeredBy.combatStart) {
      eventIds.push(eventIdProvider.getCombatStartEventId());
    }

    if (triggeredBy.notActiveWeapon) {
      weapons
        .filter((weapon) => weapon.id !== triggeredBy.notActiveWeapon)
        .forEach((weapon) => {
          eventIds.push(eventIdProvider.getActiveWeaponEventId(weapon.id));
        });
    }

    if (triggeredBy.activeWeapon) {
      weapons
        .filter((weapon) => weapon.id === triggeredBy.activeWeapon)
        .forEach((weapon) => {
          eventIds.push(eventIdProvider.getActiveWeaponEventId(weapon.id));
        });
    }

    if (triggeredBy.fullChargeOfWeapons) {
      weapons
        .filter((weapon) =>
          triggeredBy.fullChargeOfWeapons?.includes(weapon.id)
        )
        .forEach((weapon) => {
          eventIds.push(
            eventIdProvider.getFullChargeOfWeaponEventId(weapon.id)
          );
        });
    }

    if (triggeredBy.startOfAnyAttack) {
      eventIds.push(eventIdProvider.getStartOfAnyAttackEventId());
    }
    if (triggeredBy.endOfAnyAttack) {
      eventIds.push(eventIdProvider.getEndOfAnyAttackEventId());
    }

    if (triggeredBy.startOfAttacks) {
      triggeredBy.startOfAttacks.forEach((attackId) => {
        eventIds.push(eventIdProvider.getStartOfAttackEventId(attackId));
      });
    }
    if (triggeredBy.endOfAttacks) {
      triggeredBy.endOfAttacks.forEach((attackId) => {
        eventIds.push(eventIdProvider.getEndOfAttackEventId(attackId));
      });
    }

    if (triggeredBy.startOfAnySkillAttack) {
      eventIds.push(eventIdProvider.getStartOfAnySkillAttackEventId());
    }
    if (triggeredBy.endOfAnySkillAttack) {
      eventIds.push(eventIdProvider.getEndOfAnySkillAttackEventId());
    }

    if (triggeredBy.startOfAnyDischargeAttack) {
      eventIds.push(eventIdProvider.getStartOfAnyDischargeAttackEventId());
    }
    if (triggeredBy.endOfAnyDischargeAttack) {
      eventIds.push(eventIdProvider.getEndOfAnyDischargeAttackEventId());
    }

    if (triggeredBy.startOfSkillOfWeaponType) {
      eventIds.push(
        eventIdProvider.getStartOfSkillOfWeaponTypeEventId(
          triggeredBy.startOfSkillOfWeaponType
        )
      );
    }
    if (triggeredBy.endOfSkillOfWeaponType) {
      eventIds.push(
        eventIdProvider.getEndOfSkillOfWeaponTypeEventId(
          triggeredBy.endOfSkillOfWeaponType
        )
      );
    }

    if (triggeredBy.startOfDischargeOfWeaponType) {
      eventIds.push(
        eventIdProvider.getStartOfDischargeOfWeaponTypeEventId(
          triggeredBy.startOfDischargeOfWeaponType
        )
      );
    }
    if (triggeredBy.endOfDischargeOfWeaponType) {
      eventIds.push(
        eventIdProvider.getEndOfDischargeOfWeaponTypeEventId(
          triggeredBy.endOfDischargeOfWeaponType
        )
      );
    }

    if (triggeredBy.startOfSkillOfElementalType) {
      eventIds.push(
        eventIdProvider.getStartOfSkillOfElementalTypeEventId(
          triggeredBy.startOfSkillOfElementalType
        )
      );
    }
    if (triggeredBy.endOfSkillOfElementalType) {
      eventIds.push(
        eventIdProvider.getEndOfSkillOfElementalTypeEventId(
          triggeredBy.endOfSkillOfElementalType
        )
      );
    }

    if (triggeredBy.startOfDischargeOfElementalType) {
      eventIds.push(
        eventIdProvider.getStartOfDischargeOfElementalTypeEventId(
          triggeredBy.startOfDischargeOfElementalType
        )
      );
    }
    if (triggeredBy.endOfDischargeOfElementalType) {
      eventIds.push(
        eventIdProvider.getEndOfDischargeOfElementalTypeEventId(
          triggeredBy.endOfDischargeOfElementalType
        )
      );
    }

    if (triggeredBy.hitOfAnyAttack) {
      eventIds.push(eventIdProvider.getHitOfAnyAttackEventId());
    }
    if (triggeredBy.hitOfWeapon) {
      eventIds.push(
        eventIdProvider.getHitOfWeaponEventId(triggeredBy.hitOfWeapon)
      );
    }

    if (triggeredBy.startOfBuff) {
      eventIds.push(
        eventIdProvider.getStartOfBuffEventId(triggeredBy.startOfBuff)
      );
    }
    if (triggeredBy.endOfBuff) {
      eventIds.push(eventIdProvider.getEndOfBuffEventId(triggeredBy.endOfBuff));
    }

    if (triggeredBy.resourceUpdate) {
      eventIds.push(
        eventIdProvider.getResourceUpdateEventId(triggeredBy.resourceUpdate)
      );
    }

    return eventIds;
  }
}
