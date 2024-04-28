import { tickDuration } from '../../../constants/tick';
import type { Loadout } from '../../loadout';
import type { Serializable } from '../../persistable';
import type { Weapon } from '../../weapon';
import { ActionRequirementsChecker } from '../action/action-requirements-checker';
import { ActionResourceUpdater } from '../action/action-resource-updater';
import type { AttackId } from '../attack/attack-definition';
import { AttackRegistryFactory } from '../attack/attack-registry-factory';
import { CombinedAttackRegistry } from '../attack/combined-attack-registry';
import { WeaponTracker } from '../attack/weapon-tracker';
import type { BuffRegistry } from '../buff/buff-registry';
import { BuffRegistryFactory } from '../buff/buff-registry-factory';
import { CombatDamageSummary } from '../combat-damage-summary/combat-damage-summary';
import { DamageTimelineCalculator } from '../damage-calculation/damage-timeline-calculator';
import { CombatEventConfigurator } from '../event/combat-event-configurator';
import { CombatEventNotifier } from '../event/combat-event-notifier';
import { QueuedEventManager } from '../event/queued-event-manager';
import type { Relics } from '../relics/relics';
import { ResourceRegenerator } from '../resource/resource-regenerator';
import type { ResourceRegistry } from '../resource/resource-registry';
import { ResourceRegistryFactory } from '../resource/resource-registry-factory';
import { TickTracker } from '../tick-tracker';
import { TimeInterval } from '../time-interval/time-interval';
import { AttackSimulator } from './attack-simulator';
import { BuffSimulator } from './buff-simulator';
import type {
  CombatSimulatorSnapshot,
  WeaponAttackSnapshot,
} from './combat-simulator-snapshot';
import type { CombatSimulatorDto } from './dtos/combat-simulator-dto';
import { ResourceSimulator } from './resource-simulator';
import { TickSimulator } from './tick-simulator';

export class CombatSimulator implements Serializable<CombatSimulatorDto> {
  private readonly tickTracker: TickTracker;

  private readonly queuedEventManager: QueuedEventManager;
  private readonly combatEventNotifier: CombatEventNotifier;

  private readonly weaponTracker: WeaponTracker;

  private readonly combinedAttackRegistry: CombinedAttackRegistry;
  private readonly buffRegistry: BuffRegistry;
  private readonly resourceRegistry: ResourceRegistry;

  private readonly combatDamageSummary: CombatDamageSummary;
  private readonly damageTimelineCalculator: DamageTimelineCalculator;

  private readonly actionRequirementsChecker: ActionRequirementsChecker;
  private readonly actionResourceUpdater: ActionResourceUpdater;

  private readonly resourceRegenerator: ResourceRegenerator;

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

    this.combatDamageSummary = new CombatDamageSummary(combatDuration);
    this.damageTimelineCalculator = new DamageTimelineCalculator(
      this.combatDamageSummary,
      loadout,
      loadout.loadoutStats,
      team,
      this.combinedAttackRegistry,
      this.buffRegistry,
      this.resourceRegistry
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
      this.actionRequirementsChecker,
      this.combatEventNotifier
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
        this.actionRequirementsChecker.hasRequirementsBeenMetAt(
          attack.requirements,
          attackTime
        )
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

  /** Similar to `toDto()`, but cleaned up and aggregated for display purposes. The intention is for the output of this to be for display purposes only and not able to be deserialized with all the correct states later. e.g. Actions with empty timelines removed, Player input attacks are combined into one, for each weapon */
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

      for (const attackAction of timeline.actions) {
        weaponTimeline.events.push({
          attackDisplayName: displayName,
          startTime: attackAction.startTime,
          endTime: attackAction.endTime,
        });
      }
    }
    // Sort timeline events chronologically for each weapon and push to result
    for (const [, { attackTimeline: timeline }] of weaponAttacksMap) {
      timeline.events.sort((a, b) => a.startTime - b.startTime);
      playerInputAttackTimelines.push(timeline);
    }

    const { triggeredAttacks, buffs, resources, combatDamageSummary } =
      this.toDto();

    return {
      weaponAttacks: [...weaponAttacksMap.values()],
      triggeredAttacks: triggeredAttacks.filter(
        (attack) => attack.timeline.actions.length
      ),
      buffs: buffs.filter((buff) => buff.timeline.actions.length),
      resources: resources.filter(
        (resource) => resource.timeline.actions.length
      ),
      combatDamageSummary,
    };
  }

  /** Raw serialized DTO of all properties. */
  public toDto(): CombatSimulatorDto {
    const {
      combinedAttackRegistry,
      buffRegistry,
      resourceRegistry,
      combatDamageSummary,
    } = this;

    const { playerInputAttacks, triggeredAttacks } =
      combinedAttackRegistry.toDto();

    return {
      playerInputAttacks,
      triggeredAttacks,
      buffs: buffRegistry.toDto().buffs,
      resources: resourceRegistry.toDto().resources,
      combatDamageSummary: combatDamageSummary.toDto(),
      version: 1,
    };
  }
}
