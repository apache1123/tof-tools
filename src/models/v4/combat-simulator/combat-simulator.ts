import { tickDuration } from '../../../constants/tick';
import type { Loadout } from '../../loadout';
import type { Serializable } from '../../persistable';
import type { Weapon } from '../../weapon';
import { AbilityRequirementsChecker } from '../ability/ability-requirements-checker';
import { AbilityResourceUpdater } from '../ability/ability-resource-updater';
import { AttackAvailabilityChecker } from '../attack/attack-availability-checker';
import type { AttackId } from '../attack/attack-definition';
import { AttackRegistryFactory } from '../attack/attack-registry-factory';
import { CombinedAttackRegistry } from '../attack/combined-attack-registry';
import type { BuffRegistry } from '../buff/buff-registry';
import { BuffRegistryFactory } from '../buff/buff-registry-factory';
import { CombatDamageSummary } from '../combat-damage-summary/combat-damage-summary';
import { DamageTimelineCalculator } from '../damage-calculation/damage-timeline-calculator';
import { CombatEventConfigurator } from '../event/combat-event-configurator';
import { CombatEventNotifier } from '../event/combat-event-notifier';
import { QueuedEventManager } from '../event/queued-event-manager';
import type { Relics } from '../relics/relics';
import { DefaultResourceFactory } from '../resource/default-resource-factory';
import { ResourceRegenerator } from '../resource/resource-regenerator';
import type { ResourceRegistry } from '../resource/resource-registry';
import { ResourceRegistryFactory } from '../resource/resource-registry-factory';
import type { Target } from '../target/target';
import { TickTracker } from '../tick-tracker';
import { TimeInterval } from '../time-interval/time-interval';
import { WeaponTracker } from '../weapon-tracker/weapon-tracker';
import { WeaponTrackerTimeline } from '../weapon-tracker/weapon-tracker-timeline';
import { AttackSimulator } from './attack-simulator';
import { BuffSimulator } from './buff-simulator';
import type { CombatSimulatorOptions } from './combat-simulator-options';
import type {
  CombatSimulatorSnapshot,
  WeaponAttackSnapshot,
} from './combat-simulator-snapshot';
import type { CombatSimulatorDto } from './dtos/combat-simulator-dto';
import { ResourceSimulator } from './resource-simulator';
import { TickSimulator } from './tick-simulator';

export class CombatSimulator implements Serializable<CombatSimulatorDto> {
  public readonly combatDuration: number;

  private readonly loadout: Loadout;

  private readonly target: Target;

  private readonly tickTracker: TickTracker;
  private readonly weaponTracker: WeaponTracker;

  private readonly queuedEventManager: QueuedEventManager;
  private readonly combatEventNotifier: CombatEventNotifier;

  private readonly combinedAttackRegistry: CombinedAttackRegistry;
  private readonly buffRegistry: BuffRegistry;
  private readonly resourceRegistry: ResourceRegistry;

  private readonly combatDamageSummary: CombatDamageSummary;
  private readonly damageTimelineCalculator: DamageTimelineCalculator;

  private readonly abilityRequirementsChecker: AbilityRequirementsChecker;
  private readonly abilityResourceUpdater: AbilityResourceUpdater;

  private readonly attackAvailabilityChecker: AttackAvailabilityChecker;

  private readonly resourceRegenerator: ResourceRegenerator;

  private readonly attackSimulator: AttackSimulator;
  private readonly buffSimulator: BuffSimulator;
  private readonly resourceSimulator: ResourceSimulator;
  private readonly tickSimulator: TickSimulator;

  public constructor(
    loadout: Loadout,
    relics: Relics,
    options: CombatSimulatorOptions
  ) {
    const { combatDuration, targetResistance } = options;

    this.combatDuration = combatDuration;
    this.loadout = loadout;
    const { team } = this.loadout;

    this.target = { resistance: targetResistance };

    const startingTickInterval = new TimeInterval(-tickDuration, 0);
    this.tickTracker = new TickTracker(startingTickInterval, tickDuration);
    this.weaponTracker = new WeaponTracker(
      new WeaponTrackerTimeline(combatDuration)
    );

    this.queuedEventManager = new QueuedEventManager();
    this.combatEventNotifier = new CombatEventNotifier(this.queuedEventManager);

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

    const defaultResources =
      DefaultResourceFactory.createDefaultResources(combatDuration);
    this.resourceRegistry = ResourceRegistryFactory.create(
      combatDuration,
      team,
      [...Object.values(defaultResources)]
    );

    this.combatDamageSummary = new CombatDamageSummary(combatDuration);
    this.damageTimelineCalculator = new DamageTimelineCalculator(
      this.combatDamageSummary,
      loadout,
      loadout.loadoutStats,
      team,
      this.combinedAttackRegistry,
      this.buffRegistry,
      this.resourceRegistry,
      this.target
    );

    this.abilityResourceUpdater = new AbilityResourceUpdater(
      this.resourceRegistry
    );
    this.abilityRequirementsChecker = new AbilityRequirementsChecker(
      team,
      this.weaponTracker,
      this.buffRegistry,
      this.resourceRegistry
    );

    this.attackAvailabilityChecker = new AttackAvailabilityChecker(
      this.weaponTracker,
      defaultResources.charge,
      this.abilityRequirementsChecker
    );

    this.resourceRegenerator = new ResourceRegenerator(
      this.combatDamageSummary,
      this.combatEventNotifier
    );

    CombatEventConfigurator.configure(
      this.queuedEventManager,
      team,
      this.tickTracker,
      this.weaponTracker,
      this.combinedAttackRegistry,
      this.buffRegistry,
      this.resourceRegistry,
      this.abilityRequirementsChecker,
      this.combatEventNotifier
    );

    this.attackSimulator = new AttackSimulator(
      this.tickTracker,
      this.combinedAttackRegistry,
      this.abilityResourceUpdater,
      this.combatEventNotifier
    );
    this.buffSimulator = new BuffSimulator(
      this.tickTracker,
      this.buffRegistry,
      this.abilityResourceUpdater,
      this.combatEventNotifier
    );
    this.resourceSimulator = new ResourceSimulator(
      this.tickTracker,
      this.resourceRegistry,
      this.resourceRegenerator,
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

    // Pre-combat preparations
    for (const resource of this.resourceRegistry.resources) {
      resource.addStartingAmount();
    }
    this.combatEventNotifier.notifyCombatStart();
    this.tickSimulator.simulateTickCombatStart();
  }

  public get nextAvailableAttacks(): AttackId[] {
    const attackTime = this.tickTracker.currentTickStart;

    return this.combinedAttackRegistry
      .getAvailablePlayerInputAttacks(attackTime)
      .filter((attack) =>
        this.attackAvailabilityChecker.isAttackAvailableAt(attack, attackTime)
      )
      .map((item) => item.id);
  }

  public performAttack(attackId: AttackId) {
    if (!this.nextAvailableAttacks.includes(attackId)) {
      throw new Error(
        `Player input attack ${attackId} is not available to be performed`
      );
    }

    this.combatEventNotifier.notifyAttackRequest(attackId);
    this.tickSimulator.simulateTicksAfterAttackRequest();
  }

  /** Similar to `toDto()`, but cleaned up and aggregated for display purposes. The intention is for the output of this to be for display purposes only and not able to be deserialized with all the correct states later. e.g. Abilities with empty timelines removed, Player input attacks are combined into one, for each weapon */
  public snapshot(): CombatSimulatorSnapshot {
    const playerInputAttackTimelines = [];

    const weaponAttacksMap = new Map<Weapon, WeaponAttackSnapshot>();
    // Combine all player input attack timelines into one, for each weapon
    for (const { displayName, weapon, timeline } of this.combinedAttackRegistry
      .playerInputAttacks) {
      if (!weaponAttacksMap.has(weapon)) {
        weaponAttacksMap.set(weapon, {
          weaponId: weapon.id,
          weaponDisplayName: weapon.displayName,
          attackTimeline: {
            events: [],
          },
        });
      }

      const weaponTimeline = weaponAttacksMap.get(weapon)?.attackTimeline;
      if (!weaponTimeline) {
        continue;
      }

      for (const attackEvent of timeline.events) {
        weaponTimeline.events.push({
          attackDisplayName: displayName,
          startTime: attackEvent.startTime,
          endTime: attackEvent.endTime,
        });
      }
    }
    // Sort timeline events chronologically for each weapon and push to result
    for (const [, { attackTimeline: timeline }] of weaponAttacksMap) {
      timeline.events.sort((a, b) => a.startTime - b.startTime);
      playerInputAttackTimelines.push(timeline);
    }

    const { loadout, triggeredAttacks, buffs, resources, combatDamageSummary } =
      this.toDto();

    return {
      loadout,
      weaponAttacks: [...weaponAttacksMap.values()],
      triggeredAttacks: triggeredAttacks.filter(
        (attack) => attack.timeline.events.length
      ),
      buffs: buffs.filter((buff) => buff.timeline.events.length),
      resources: resources.filter(
        (resource) => resource.timeline.events.length
      ),
      damageSummary: combatDamageSummary.cumulatedDamageSummary,
    };
  }

  /** Raw serialized DTO of all properties. */
  public toDto(): CombatSimulatorDto {
    const {
      loadout,
      combinedAttackRegistry,
      buffRegistry,
      resourceRegistry,
      combatDamageSummary,
    } = this;

    const { playerInputAttacks, triggeredAttacks } =
      combinedAttackRegistry.toDto();

    return {
      loadout: loadout.toDto(),
      playerInputAttacks,
      triggeredAttacks,
      buffs: buffRegistry.toDto().buffs,
      resources: resourceRegistry.toDto().resources,
      combatDamageSummary: combatDamageSummary.toDto(),
      version: 1,
    };
  }
}
