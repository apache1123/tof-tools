import type { AttackId } from '../../../definitions/types/attack/attack-ability';
import type { Loadout } from '../../loadout';
import type { UserStats } from '../../user-stats';
import { Character } from '../character/character';
import { CombatContext } from '../combat-context/combat-context';
import { EventManager } from '../event/event-manager';
import type { Relics } from '../relics/relics';
import type { Target } from '../target/target';
import type { CombatSimulatorOptions } from './combat-simulator-options';

export class CombatSimulator {
  private readonly combatContext: CombatContext;

  public constructor(
    loadout: Loadout,
    userStats: UserStats,
    relics: Relics,
    options: CombatSimulatorOptions
  ) {
    const { combatDuration, targetResistance } = options;

    const eventManager = new EventManager();

    const character = new Character(userStats, loadout, loadout.loadoutStats);

    const target: Target = { resistance: targetResistance };

    this.combatContext = new CombatContext(
      combatDuration,
      loadout,
      userStats,
      relics,
      character,
      eventManager,
      target
    );
  }

  public performAttack(id: AttackId) {
    return this.combatContext.performAttack(id);
  }

  public getAvailableAttacks() {
    return this.combatContext.getAvailableAttacks();
  }

  // /** Similar to `toDto()`, but cleaned up and aggregated for display purposes. The intention is for the output of this to be for display purposes only and not able to be deserialized with all the correct states later. e.g. Abilities with empty timelines removed, Player input attacks are combined into one, for each weapon */
  // public snapshot(): CombatSimulatorSnapshot {
  //   const playerInputAttackTimelines = [];

  //   const weaponAttacksMap = new Map<Weapon, WeaponAttackSnapshot>();
  //   // Combine all player input attack timelines into one, for each weapon
  //   for (const { displayName, weapon, timeline } of this.attackRegistry
  //     .activeAttacks) {
  //     if (!weaponAttacksMap.has(weapon)) {
  //       weaponAttacksMap.set(weapon, {
  //         weaponId: weapon.id,
  //         weaponDisplayName: weapon.displayName,
  //         attackTimeline: {
  //           events: [],
  //         },
  //       });
  //     }

  //     const weaponTimeline = weaponAttacksMap.get(weapon)?.attackTimeline;
  //     if (!weaponTimeline) {
  //       continue;
  //     }

  //     for (const attackEvent of timeline.events) {
  //       weaponTimeline.events.push({
  //         attackDisplayName: displayName,
  //         startTime: attackEvent.startTime,
  //         endTime: attackEvent.endTime,
  //       });
  //     }
  //   }
  //   // Sort timeline events chronologically for each weapon and push to result
  //   for (const [, { attackTimeline: timeline }] of weaponAttacksMap) {
  //     timeline.events.sort((a, b) => a.startTime - b.startTime);
  //     playerInputAttackTimelines.push(timeline);
  //   }

  //   const { loadout, passiveAttacks, buffs, resources, combatDamageSummary } =
  //     this.toDto();

  //   return {
  //     loadout,
  //     weaponAttacks: [...weaponAttacksMap.values()],
  //     passiveAttacks: passiveAttacks.filter(
  //       (attack) => attack.timeline.events.length
  //     ),
  //     buffs: buffs.filter((buff) => this.utilizedBuffs.has(buff.id)),
  //     resources: resources.filter(
  //       (resource) => resource.timeline.events.length
  //     ),
  //     damageSummary: combatDamageSummary.cumulatedDamageSummary,
  //   };
  // }

  // /** Raw serialized DTO of all properties. */
  // public toDto(): CombatSimulatorDto {
  //   const {
  //     loadout,
  //     attackRegistry,
  //     buffRegistry,
  //     resourceRegistry,
  //     combatDamageSummary,
  //   } = this;

  //   const { activeAttacks, passiveAttacks } = attackRegistry.toDto();

  //   return {
  //     loadout: loadout.toDto(),
  //     activeAttacks,
  //     passiveAttacks,
  //     buffs: buffRegistry.toDto().items,
  //     resources: resourceRegistry.toDto().resources,
  //     combatDamageSummary: combatDamageSummary.toDto(),
  //     version: 1,
  //   };
  // }
}
