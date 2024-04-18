import type { Loadout } from '../../loadout';
import type { Weapon } from '../../weapon';
import type { AttackId } from '../attack/attack-definition';
import { AttackRegistryFactory } from '../attack/attack-registry-factory';
import { CombinedAttackRegistry } from '../attack/combined-attack-registry';
import { WeaponTracker } from '../attack/weapon-tracker';
import type { BuffRegistry } from '../buff/buff-registry';
import { BuffRegistryFactory } from '../buff/buff-registry-factory';
import type { CombatSimulatorSnapshot } from '../combat-simulator-snapshot/combat-simulator-snapshot';
import type { DamageSummarySnapshot } from '../combat-simulator-snapshot/damage-summary-snapshot';
import type { TimelineSnapshot } from '../combat-simulator-snapshot/timeline-snapshot';
import { DamageTimelineCalculator } from '../damage-calculation/damage-timeline-calculator';
import { DamageSummaryTimeline } from '../damage-summary-timeline/damage-summary-timeline';
import { CombatEventConfigurator } from '../event/combat-event-configurator';
import { CombatEventNotifier } from '../event/combat-event-notifier';
import { EventManager } from '../event/event-manager';
import type { Relics } from '../relics/relics';
import type { ResourceRegistry } from '../resource/resource-registry';
import { ResourceRegistryFactory } from '../resource/resource-registry-factory';
import { TimeTracker } from '../time-tracker';
import { TickProcessor } from './tick-processor';

export class CombatSimulator {
  private readonly weaponTracker: WeaponTracker;
  private readonly timeTracker: TimeTracker;

  private readonly attackRegistry: CombinedAttackRegistry;
  private readonly buffRegistry: BuffRegistry;
  private readonly resourceRegistry: ResourceRegistry;

  private readonly eventManager: EventManager;
  private readonly combatEventNotifier: CombatEventNotifier;

  private readonly damageSummaryTimeline: DamageSummaryTimeline;
  private readonly damageTimelineCalculator: DamageTimelineCalculator;

  private readonly tickProcessor: TickProcessor;

  public constructor(
    public readonly combatDuration: number,
    loadout: Loadout,
    relics: Relics
  ) {
    const { team } = loadout;

    this.weaponTracker = new WeaponTracker();
    this.timeTracker = new TimeTracker();

    const playerInputAttackRegistry =
      AttackRegistryFactory.createPlayerInputAttackRegistry(
        combatDuration,
        team
      );
    const triggeredAttackRegistry =
      AttackRegistryFactory.createTriggeredAttackRegistry(combatDuration, team);
    this.attackRegistry = new CombinedAttackRegistry(
      playerInputAttackRegistry,
      triggeredAttackRegistry
    );

    this.buffRegistry = BuffRegistryFactory.create(
      combatDuration,
      loadout,
      relics
    );

    this.resourceRegistry = ResourceRegistryFactory.create(
      combatDuration,
      team
    );

    this.eventManager = new EventManager();
    this.combatEventNotifier = new CombatEventNotifier(this.eventManager);

    CombatEventConfigurator.configure(
      this.eventManager,
      this.combatEventNotifier,
      team,
      this.weaponTracker,
      this.timeTracker,
      this.attackRegistry,
      this.buffRegistry,
      this.resourceRegistry
    );

    this.damageSummaryTimeline = new DamageSummaryTimeline(combatDuration);
    this.damageTimelineCalculator = new DamageTimelineCalculator(
      this.damageSummaryTimeline,
      loadout,
      loadout.loadoutStats,
      team,
      this.attackRegistry,
      this.buffRegistry
    );

    this.tickProcessor = new TickProcessor(
      this.attackRegistry,
      this.buffRegistry,
      this.resourceRegistry,
      this.damageTimelineCalculator,
      this.combatEventNotifier
    );
  }

  public get nextAvailableAttacks(): AttackId[] {
    return this.attackRegistry
      .getNextPlayerInputAttacksOffCooldown(this.timeTracker)
      .map((item) => item.definition.id);
  }

  public performAttack(attackId: AttackId, time?: number) {
    if (time === 0 || this.timeTracker.nextPlayerInputAttackTime === 0)
      this.preCombat();

    if (!this.nextAvailableAttacks.includes(attackId)) {
      throw new Error(
        `Player input attack ${attackId} is not available to be performed`
      );
    }

    this.combatEventNotifier.notifyAttackRequest(
      time ?? this.timeTracker.nextPlayerInputAttackTime,
      attackId
    );

    this.tickProcessor.processTicksForLastAttack();
  }

  public snapshot(): CombatSimulatorSnapshot {
    const playerInputAttackTimelines = [];

    const weaponTimelineMap = new Map<Weapon, TimelineSnapshot>();
    // Combine all player input attack timelines into one, for each weapon
    for (const { weapon, definition, timeline } of this.attackRegistry
      .playerInputAttacks) {
      if (!weaponTimelineMap.has(weapon)) {
        weaponTimelineMap.set(weapon, {
          id: weapon.id,
          displayName: weapon.displayName,
          actions: [],
        });
      }

      const weaponTimeline = weaponTimelineMap.get(weapon);
      if (!weaponTimeline) {
        continue;
      }

      for (const attackAction of timeline.actions) {
        weaponTimeline.actions.push({
          displayName: definition.displayName,
          startTime: attackAction.startTime,
          endTime: attackAction.endTime,
        });
      }
    }
    // Sort timeline events chronologically for each weapon and push to result
    for (const [, timeline] of weaponTimelineMap) {
      timeline.actions.sort((a, b) => a.startTime - b.startTime);
      playerInputAttackTimelines.push(timeline);
    }

    const triggeredAttackTimelines = [];
    for (const { definition, timeline } of this.attackRegistry
      .triggeredAttacks) {
      if (!timeline.actions.length) continue;

      triggeredAttackTimelines.push({
        id: definition.id,
        displayName: definition.displayName,
        actions: timeline.actions.map((attackAction) => ({
          displayName: definition.displayName,
          startTime: attackAction.startTime,
          endTime: attackAction.endTime,
        })),
      });
    }

    const buffTimelines = [];
    for (const { definition, timeline } of this.buffRegistry.buffs) {
      if (!timeline.actions.length) continue;

      buffTimelines.push({
        id: definition.id,
        displayName: definition.displayName,
        actions: timeline.actions.map((buffAction) => ({
          displayName: `${definition.displayName} - Stacks: ${buffAction.stacks}`,
          startTime: buffAction.startTime,
          endTime: buffAction.endTime,
        })),
      });
    }

    const damageTimeline: TimelineSnapshot = {
      id: 'damage-summary',
      displayName: 'Damage',
      actions: this.damageSummaryTimeline.damageSummaryEvents.map((event) => ({
        displayName: `${event.cumulatedDamageSummary.totalDamage.finalDamage} (${event.cumulatedDamageSummary.totalDamage.baseDamage})`,
        startTime: event.startTime,
        endTime: event.endTime,
      })),
    };

    const damageSummary = this.damageSummaryTimeline.cumulatedDamageSummary;
    let damageSummarySnapshot: DamageSummarySnapshot;
    if (damageSummary) {
      // TODO: put this logic into the respective classes
      damageSummarySnapshot = {
        totalDamage: damageSummary.totalDamage.toDto(),
        damageByWeapon: [...damageSummary.weaponDamageSummaries].map(
          ([weaponName, weaponDamageSummary]) => ({
            weaponName: weaponName,
            percentageOfTotalDamage:
              damageSummary.damagePercentageByWeapon.find(
                (damagePercentageItem) =>
                  damagePercentageItem.weaponName === weaponName
              )?.percentage ?? 0,
            totalDamage: weaponDamageSummary.totalDamage.toDto(),
            normalAttackDamage:
              weaponDamageSummary.attackTypeDamageSummaries.normal.totalDamage.toDto(),
            dodgeAttackDamage:
              weaponDamageSummary.attackTypeDamageSummaries.dodge.totalDamage.toDto(),
            skillAttackDamage:
              weaponDamageSummary.attackTypeDamageSummaries.skill.totalDamage.toDto(),
            dischargeAttackDamage:
              weaponDamageSummary.attackTypeDamageSummaries.discharge.totalDamage.toDto(),
            passiveAttackDamage:
              weaponDamageSummary.attackTypeDamageSummaries.passive.totalDamage.toDto(),
            otherAttackDamage:
              weaponDamageSummary.attackTypeDamageSummaries.other.totalDamage.toDto(),
          })
        ),
        duration: damageSummary.duration,
      };
    } else {
      damageSummarySnapshot = {
        totalDamage: {
          baseDamage: 0,
          finalDamage: 0,
          damageMultiplier: 0,
        },
        damageByWeapon: [],
        duration: 0,
      };
    }

    const resourceTimelines = [];
    for (const resource of this.resourceRegistry.resources) {
      const { definition, timeline } = resource;
      if (!timeline.actions.length) continue;

      resourceTimelines.push({
        id: definition.id,
        displayName: definition.displayName,
        actions: timeline.actions.map((resourceAction) => ({
          displayName: `${definition.displayName} - Amount: ${
            resourceAction.amount
          }. Cumulated: ${resource.getCumulatedAmount(resourceAction.endTime)}`,
          startTime: resourceAction.startTime,
          endTime: resourceAction.endTime,
        })),
      });
    }

    return {
      playerInputAttackTimelines,
      triggeredAttackTimelines,
      buffTimelines,
      resourceTimelines,
      damageTimeline,
      damageSummary: damageSummarySnapshot,
    };
  }

  private preCombat() {
    for (const resource of this.resourceRegistry.resources) {
      resource.addStartingAmount();
    }
  }
}
