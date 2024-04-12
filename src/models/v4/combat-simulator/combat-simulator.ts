import type { Loadout } from '../../loadout';
import type { Weapon } from '../../weapon';
import { ActionNotifier } from '../action/action-notifier';
import type { AttackId } from '../attack/attack-definition';
import { AttackRegistryFactory } from '../attack/attack-registry-factory';
import { CombinedAttackRegistry } from '../attack/combined-attack-registry';
import { WeaponTracker } from '../attack/weapon-tracker';
import { AttackNotifier } from '../attack-event/attack-notifier';
import { AttackRequestNotifier } from '../attack-request/attack-request-notifier';
import type { BuffRegistry } from '../buff/buff-registry';
import { BuffRegistryFactory } from '../buff/buff-registry-factory';
import { ChargeTimeline } from '../charge/charge-timeline';
import type { CombatSimulatorSnapshot } from '../combat-simulator-snapshot/combat-simulator-snapshot';
import type { DamageSummarySnapshot } from '../combat-simulator-snapshot/damage-summary-snapshot';
import type { TimelineSnapshot } from '../combat-simulator-snapshot/timeline-snapshot';
import { DamageTimelineCalculator } from '../damage-calculation/damage-timeline-calculator';
import { DamageSummaryTimeline } from '../damage-summary-timeline/damage-summary-timeline';
import { EventConfigurator } from '../event/event-configurator';
import { eventIdProvider } from '../event/event-id-provider';
import type { EventNotifier } from '../event/event-notifier';
import type { Relics } from '../relics/relics';
import { TimeTracker } from '../time-tracker';

export class CombatSimulator {
  private readonly weaponTracker: WeaponTracker;
  private readonly timeTracker: TimeTracker;
  private readonly chargeTimeline: ChargeTimeline;

  private readonly combinedAttackRegistry: CombinedAttackRegistry;
  private readonly buffRegistry: BuffRegistry;

  private readonly attackRequestNotifier: AttackRequestNotifier;
  private readonly attackNotifier: AttackNotifier;
  private readonly eventNotifier: EventNotifier;

  private readonly damageSummaryTimeline: DamageSummaryTimeline;
  private readonly damageCalculator: DamageTimelineCalculator;

  public constructor(
    public readonly combatDuration: number,
    loadout: Loadout,
    relics: Relics
  ) {
    const { team } = loadout;

    this.weaponTracker = new WeaponTracker();
    this.timeTracker = new TimeTracker();
    this.chargeTimeline = new ChargeTimeline(combatDuration);

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

    this.attackRequestNotifier = new AttackRequestNotifier();
    this.attackNotifier = new AttackNotifier();
    this.eventNotifier = new ActionNotifier();

    EventConfigurator.configure(
      this.attackRequestNotifier,
      this.attackNotifier,
      this.eventNotifier,
      team,
      this.weaponTracker,
      this.timeTracker,
      this.chargeTimeline,
      this.combinedAttackRegistry,
      this.buffRegistry
    );

    this.damageSummaryTimeline = new DamageSummaryTimeline(combatDuration);
    this.damageCalculator = new DamageTimelineCalculator(
      this.damageSummaryTimeline,
      loadout,
      loadout.loadoutStats,
      team,
      this.combinedAttackRegistry,
      this.buffRegistry
    );
  }

  public get nextAvailableAttacks(): AttackId[] {
    return this.combinedAttackRegistry
      .getNextPlayerInputAttacksOffCooldown(this.timeTracker)
      .map((item) => item.attackDefinition.id);
  }

  public performAttack(attackId: AttackId, time?: number) {
    if (!this.nextAvailableAttacks.includes(attackId)) {
      throw new Error(
        `Player input attack ${attackId} is not available to be performed`
      );
    }

    this.attackRequestNotifier.notify(
      eventIdProvider.getAttackRequestEventId(attackId),
      { time: time ?? this.timeTracker.nextAttackTime }
    );

    this.calculateDamageForLastAttack();
  }

  public snapshot(): CombatSimulatorSnapshot {
    const playerInputAttackTimelines = [];

    const weaponTimelineMap = new Map<Weapon, TimelineSnapshot>();
    // Combine all player input attack timelines into one, for each weapon
    for (const { weapon, attackDefinition, attackTimeline } of this
      .combinedAttackRegistry.playerInputAttackItems) {
      if (!weaponTimelineMap.has(weapon)) {
        weaponTimelineMap.set(weapon, {
          id: weapon.id,
          displayName: weapon.displayName,
          events: [],
        });
      }

      const weaponTimeline = weaponTimelineMap.get(weapon);
      if (!weaponTimeline) {
        continue;
      }

      for (const attack of attackTimeline.events) {
        weaponTimeline.events.push({
          displayName: attackDefinition.displayName,
          startTime: attack.startTime,
          endTime: attack.endTime,
        });
      }
    }
    // Sort timeline events chronologically for each weapon and push to result
    for (const [, timeline] of weaponTimelineMap) {
      timeline.events.sort((a, b) => a.startTime - b.startTime);
      playerInputAttackTimelines.push(timeline);
    }

    const triggeredAttackTimelines = [];
    for (const { attackDefinition, attackTimeline } of this
      .combinedAttackRegistry.triggeredAttackItems) {
      if (!attackTimeline.events.length) continue;

      triggeredAttackTimelines.push({
        id: attackDefinition.id,
        displayName: attackDefinition.displayName,
        events: attackTimeline.events.map((attack) => ({
          displayName: attackDefinition.displayName,
          startTime: attack.startTime,
          endTime: attack.endTime,
        })),
      });
    }

    const buffTimelines = [];
    for (const [buffDefinition, buffTimeline] of this.buffRegistry
      .buffTimelines) {
      if (!buffTimeline.events.length) continue;

      buffTimelines.push({
        id: buffDefinition.id,
        displayName: buffDefinition.displayName,
        events: buffTimeline.events.map((buff) => ({
          displayName: `${buffDefinition.displayName} - Stacks: ${buff.stacks}`,
          startTime: buff.startTime,
          endTime: buff.endTime,
        })),
      });
    }

    const damageTimeline: TimelineSnapshot = {
      id: 'damage-summary',
      displayName: 'Damage',
      events: this.damageSummaryTimeline.damageSummaryEvents.map((event) => ({
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

    return {
      playerInputAttackTimelines,
      triggeredAttackTimelines,
      buffTimelines,
      damageTimeline,
      damageSummary: damageSummarySnapshot,
    };
  }

  private calculateDamageForLastAttack() {
    const lastAttack = this.combinedAttackRegistry.lastPlayerInputAttack;
    if (lastAttack) {
      this.damageCalculator.calculateDamageUntil(lastAttack.endTime);
    }
  }
}
