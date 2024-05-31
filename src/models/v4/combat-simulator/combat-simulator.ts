import { tickDuration } from '../../../constants/tick';
import type { Loadout } from '../../loadout';
import type { Serializable } from '../../persistable';
import type { Weapon } from '../../weapon';
import type { Ability } from '../ability/ability';
import type { AbilityId } from '../ability/ability-definition';
import { AbilityRegistry } from '../ability/ability-registry';
import { AbilityResourceUpdater } from '../ability/ability-resource-updater';
import { AbilityTriggerFactory } from '../ability/ability-trigger-factory';
import { AbilityTriggerRegistry } from '../ability/ability-trigger-registry';
import { AttackFactory } from '../attack/attack-factory';
import { AttackRegistry } from '../attack/attack-registry';
import { BuffFactory } from '../buff/buff-factory';
import { BuffRegistry } from '../buff/buff-registry';
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
import { WeaponSimulator } from './weapon-simulator';

export class CombatSimulator implements Serializable<CombatSimulatorDto> {
  public readonly combatDuration: number;

  private readonly loadout: Loadout;

  private readonly target: Target;

  private readonly tickTracker: TickTracker;
  private readonly weaponTracker: WeaponTracker;

  private readonly queuedEventManager: QueuedEventManager;
  private readonly combatEventNotifier: CombatEventNotifier;

  private readonly resourceRegistry: ResourceRegistry;
  private readonly attackRegistry: AttackRegistry;
  private readonly buffRegistry: BuffRegistry;
  private readonly abilityRegistry: AbilityRegistry<Ability>;

  private readonly abilityTriggerRegistry: AbilityTriggerRegistry;

  private readonly combatDamageSummary: CombatDamageSummary;
  private readonly damageTimelineCalculator: DamageTimelineCalculator;

  private readonly abilityResourceUpdater: AbilityResourceUpdater;
  private readonly resourceRegenerator: ResourceRegenerator;

  private readonly weaponSimulator: WeaponSimulator;
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
      new WeaponTrackerTimeline(combatDuration),
      this.tickTracker
    );

    this.queuedEventManager = new QueuedEventManager();
    this.combatEventNotifier = new CombatEventNotifier(this.queuedEventManager);

    const defaultResources =
      DefaultResourceFactory.createDefaultResources(combatDuration);
    this.resourceRegistry = ResourceRegistryFactory.create(
      combatDuration,
      team,
      [...Object.values(defaultResources)]
    );

    const attacks = AttackFactory.createAttacks(
      combatDuration,
      team,
      this.tickTracker,
      this.weaponTracker,
      defaultResources.charge
    );
    this.attackRegistry = new AttackRegistry(attacks);

    const buffs = BuffFactory.createBuffs(
      combatDuration,
      loadout,
      relics,
      this.tickTracker
    );
    this.buffRegistry = new BuffRegistry(buffs);

    this.abilityRegistry = new AbilityRegistry([
      ...this.attackRegistry.items,
      ...this.buffRegistry.items,
    ]);

    const abilityTriggers = AbilityTriggerFactory.createAbilityTriggers(
      loadout,
      relics,
      this.tickTracker,
      this.weaponTracker,
      this.resourceRegistry,
      this.buffRegistry,
      this.abilityRegistry
    );
    this.abilityTriggerRegistry = new AbilityTriggerRegistry(abilityTriggers);

    this.combatDamageSummary = new CombatDamageSummary(combatDuration);
    this.damageTimelineCalculator = new DamageTimelineCalculator(
      this.combatDamageSummary,
      loadout,
      loadout.loadoutStats,
      team,
      this.attackRegistry,
      this.buffRegistry,
      this.resourceRegistry,
      this.target
    );

    this.abilityResourceUpdater = new AbilityResourceUpdater(
      this.resourceRegistry
    );

    this.resourceRegenerator = new ResourceRegenerator(
      this.combatDamageSummary,
      this.combatEventNotifier
    );

    CombatEventConfigurator.configure(
      this.queuedEventManager,
      team,
      this.attackRegistry,
      this.buffRegistry,
      this.abilityTriggerRegistry
    );

    this.weaponSimulator = new WeaponSimulator(
      this.weaponTracker,
      this.combatEventNotifier
    );
    this.attackSimulator = new AttackSimulator(
      this.tickTracker,
      this.attackRegistry,
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
      this.attackRegistry,
      this.weaponSimulator,
      this.attackSimulator,
      this.buffSimulator,
      this.resourceSimulator,
      this.damageTimelineCalculator
    );

    // Pre-combat preparations
    for (const resource of this.resourceRegistry.items) {
      resource.addStartingAmount();
    }
    this.combatEventNotifier.notifyCombatStart();
    this.tickSimulator.simulateTickCombatStart();
  }

  public get nextAvailableAbilities(): AbilityId[] {
    return this.abilityTriggerRegistry.availablePlayerInputTriggers.map(
      (abilityTrigger) => abilityTrigger.abilityId
    );
  }

  public performAbility(abilityId: AbilityId) {
    if (!this.nextAvailableAbilities.includes(abilityId)) {
      throw new Error(
        `Player input ability ${abilityId} is not available to be performed`
      );
    }

    this.combatEventNotifier.notifyAbilityRequest(abilityId);
    this.tickSimulator.simulateTicksAfterAbilityRequest();
  }

  /** Similar to `toDto()`, but cleaned up and aggregated for display purposes. The intention is for the output of this to be for display purposes only and not able to be deserialized with all the correct states later. e.g. Abilities with empty timelines removed, Player input attacks are combined into one, for each weapon */
  public snapshot(): CombatSimulatorSnapshot {
    const playerInputAttackTimelines = [];

    const weaponAttacksMap = new Map<Weapon, WeaponAttackSnapshot>();
    // Combine all player input attack timelines into one, for each weapon
    for (const { displayName, weapon, timeline } of this.attackRegistry
      .activeAttacks) {
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

    const { loadout, passiveAttacks, buffs, resources, combatDamageSummary } =
      this.toDto();

    return {
      loadout,
      weaponAttacks: [...weaponAttacksMap.values()],
      passiveAttacks: passiveAttacks.filter(
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
      attackRegistry,
      buffRegistry,
      resourceRegistry,
      combatDamageSummary,
    } = this;

    const { activeAttacks, passiveAttacks } = attackRegistry.toDto();

    return {
      loadout: loadout.toDto(),
      activeAttacks,
      passiveAttacks,
      buffs: buffRegistry.toDto().items,
      resources: resourceRegistry.toDto().resources,
      combatDamageSummary: combatDamageSummary.toDto(),
      version: 1,
    };
  }
}
