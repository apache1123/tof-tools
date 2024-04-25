import { tickDuration } from '../../../constants/tick';
import type { Loadout } from '../../loadout';
import type { Weapon } from '../../weapon';
import { ActionRequirementsChecker } from '../action/action-requirements-checker';
import { ActionResourceUpdater } from '../action/action-resource-updater';
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
import { QueuedEventManager } from '../event/queued-event-manager';
import type { Relics } from '../relics/relics';
import type { ResourceRegistry } from '../resource/resource-registry';
import { ResourceRegistryFactory } from '../resource/resource-registry-factory';
import { TickTracker } from '../tick-tracker';
import { TimeInterval } from '../time-interval';
import { AttackSimulator } from './attack-simulator';
import { BuffSimulator } from './buff-simulator';
import { ResourceSimulator } from './resource-simulator';
import { TickSimulator } from './tick-simulator';

export class CombatSimulator {
  private readonly tickTracker: TickTracker;

  private readonly queuedEventManager: QueuedEventManager;
  private readonly combatEventNotifier: CombatEventNotifier;

  private readonly weaponTracker: WeaponTracker;

  private readonly combinedAttackRegistry: CombinedAttackRegistry;
  private readonly buffRegistry: BuffRegistry;
  private readonly resourceRegistry: ResourceRegistry;

  private readonly actionRequirementsChecker: ActionRequirementsChecker;
  private readonly actionResourceUpdater: ActionResourceUpdater;

  private readonly damageSummaryTimeline: DamageSummaryTimeline;
  private readonly damageTimelineCalculator: DamageTimelineCalculator;

  private readonly attackSimulator: AttackSimulator;
  private readonly buffSimulator: BuffSimulator;
  private readonly resourceSimulator: ResourceSimulator;
  private readonly tickSimulator: TickSimulator;

  public constructor(
    public readonly combatDuration: number,
    loadout: Loadout,
    relics: Relics
  ) {
    const { team } = loadout;

    const startingTickInterval = new TimeInterval(-tickDuration, 0);
    this.tickTracker = new TickTracker(startingTickInterval, tickDuration);

    this.queuedEventManager = new QueuedEventManager();
    this.combatEventNotifier = new CombatEventNotifier(this.queuedEventManager);

    this.weaponTracker = new WeaponTracker();

    const playerInputAttackRegistry =
      AttackRegistryFactory.createPlayerInputAttackRegistry(
        combatDuration,
        team
      );
    const triggeredAttackRegistry =
      AttackRegistryFactory.createTriggeredAttackRegistry(combatDuration, team);
    this.combinedAttackRegistry = new CombinedAttackRegistry(
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

    this.actionResourceUpdater = new ActionResourceUpdater(
      this.resourceRegistry
    );
    this.actionRequirementsChecker = new ActionRequirementsChecker(
      team,
      this.weaponTracker,
      this.buffRegistry,
      this.resourceRegistry
    );

    CombatEventConfigurator.configure(
      this.queuedEventManager,
      team,
      this.tickTracker,
      this.weaponTracker,
      this.combinedAttackRegistry,
      this.buffRegistry,
      this.resourceRegistry,
      this.actionRequirementsChecker,
      this.combatEventNotifier
    );

    this.damageSummaryTimeline = new DamageSummaryTimeline(combatDuration);
    this.damageTimelineCalculator = new DamageTimelineCalculator(
      this.damageSummaryTimeline,
      loadout,
      loadout.loadoutStats,
      team,
      this.combinedAttackRegistry,
      this.buffRegistry
    );

    this.attackSimulator = new AttackSimulator(
      this.tickTracker,
      this.combinedAttackRegistry,
      this.actionResourceUpdater,
      this.combatEventNotifier
    );
    this.buffSimulator = new BuffSimulator(
      this.tickTracker,
      this.buffRegistry,
      this.actionResourceUpdater,
      this.combatEventNotifier
    );
    this.resourceSimulator = new ResourceSimulator(
      this.tickTracker,
      this.resourceRegistry,
      this.combatEventNotifier
    );
    this.tickSimulator = new TickSimulator(
      this.tickTracker,
      this.queuedEventManager,
      this.combinedAttackRegistry,
      this.attackSimulator,
      this.buffSimulator,
      this.resourceSimulator,
      this.damageTimelineCalculator
    );
  }

  public get nextAvailableAttacks(): AttackId[] {
    const attackTime = this.tickTracker.getNextClosestTickStart(
      this.tickTracker.currentTickInterval.startTime
    );

    return this.combinedAttackRegistry
      .getAvailablePlayerInputAttacks(attackTime)
      .filter((attack) =>
        this.actionRequirementsChecker.hasRequirementsBeenMetAt(
          attack.requirements,
          attackTime
        )
      )
      .map((item) => item.definition.id);
  }

  public performAttack(attackId: AttackId) {
    if (!this.nextAvailableAttacks.includes(attackId)) {
      throw new Error(
        `Player input attack ${attackId} is not available to be performed`
      );
    }

    const tickStart = this.tickTracker.currentTickInterval.startTime;
    if (tickStart <= 0) this.preCombat(tickStart);

    this.combatEventNotifier.notifyAttackRequest(tickStart, attackId);

    this.tickSimulator.simulateTicksForLastAttack();
  }

  public snapshot(): CombatSimulatorSnapshot {
    const playerInputAttackTimelines = [];

    const weaponTimelineMap = new Map<Weapon, TimelineSnapshot>();
    // Combine all player input attack timelines into one, for each weapon
    for (const { weapon, definition, timeline } of this.combinedAttackRegistry
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
    for (const { definition, timeline } of this.combinedAttackRegistry
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

  private preCombat(time: number) {
    for (const resource of this.resourceRegistry.resources) {
      resource.addStartingAmount();
    }

    this.combatEventNotifier.notifyCombatStart(time);
  }
}
