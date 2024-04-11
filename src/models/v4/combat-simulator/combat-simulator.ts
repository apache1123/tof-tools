import type { Optional } from 'utility-types';

import type { Loadout } from '../../loadout';
import type { Weapon } from '../../weapon';
import { ActionNotifier } from '../action/action-notifier';
import type { AttackRegistry } from '../attack/attack-registry';
import { AttackRegistryFactory } from '../attack/attack-registry-factory';
import { WeaponTracker } from '../attack/weapon-tracker';
import { AttackNotifier } from '../attack-event/attack-notifier';
import { AttackNotifierConfigurator } from '../attack-event/attack-notifier-configurator';
import type { AttackRequest } from '../attack-request/attack-request';
import { AttackRequestNotifier } from '../attack-request/attack-request-notifier';
import { AttackRequestNotifierConfigurator } from '../attack-request/attack-request-notifier-configurator';
import type { BuffRegistry } from '../buff/buff-registry';
import { BuffRegistryFactory } from '../buff/buff-registry-factory';
import { ChargeTimeline } from '../charge/charge-timeline';
import type { CombatSimulatorSnapshot } from '../combat-simulator-snapshot/combat-simulator-snapshot';
import type { DamageSummarySnapshot } from '../combat-simulator-snapshot/damage-summary-snapshot';
import type { TimelineSnapshot } from '../combat-simulator-snapshot/timeline-snapshot';
import { DamageCalculator } from '../damage-calculation/damage-calculator';
import { DamageSummaryTimeline } from '../damage-summary-timeline/damage-summary-timeline';
import { eventIdProvider } from '../event/event-id-provider';
import type { EventNotifier } from '../event/event-notifier';
import type { Relics } from '../relics/relics';
import { TimeTracker } from '../time-tracker';

export class CombatSimulator {
  private readonly weaponTracker: WeaponTracker;
  private readonly timeTracker: TimeTracker;
  private readonly chargeTimeline: ChargeTimeline;

  private readonly attackRegistry: AttackRegistry;
  private readonly buffRegistry: BuffRegistry;

  private readonly attackRequestNotifier: AttackRequestNotifier;
  private readonly attackNotifier: AttackNotifier;
  private readonly eventNotifier: EventNotifier;

  private readonly damageSummaryTimeline: DamageSummaryTimeline;
  private readonly damageCalculator: DamageCalculator;

  public constructor(
    public readonly combatDuration: number,
    loadout: Loadout,
    relics: Relics
  ) {
    const { team } = loadout;

    this.weaponTracker = new WeaponTracker();
    this.timeTracker = new TimeTracker();
    this.chargeTimeline = new ChargeTimeline(combatDuration);

    this.attackRegistry = AttackRegistryFactory.create(combatDuration, team);
    this.buffRegistry = BuffRegistryFactory.create(
      combatDuration,
      loadout,
      relics
    );

    this.attackRequestNotifier = new AttackRequestNotifier();
    this.attackNotifier = new AttackNotifier();
    this.eventNotifier = new ActionNotifier();

    AttackRequestNotifierConfigurator.configure(
      this.attackRequestNotifier,
      team,
      this.weaponTracker,
      this.timeTracker,
      this.chargeTimeline,
      this.attackRegistry,
      this.buffRegistry,
      this.attackNotifier
    );
    AttackNotifierConfigurator.configure(
      this.attackNotifier,
      team,
      this.weaponTracker,
      this.chargeTimeline,
      this.buffRegistry,
      this.eventNotifier
    );

    this.damageSummaryTimeline = new DamageSummaryTimeline(combatDuration);
    this.damageCalculator = new DamageCalculator(
      this.damageSummaryTimeline,
      loadout,
      loadout.loadoutStats,
      team,
      this.attackRegistry,
      this.buffRegistry
    );
  }

  public get nextAvailableAttacks(): AttackRequest[] {
    return this.attackRegistry
      .getNextAttacksOffCooldown(this.timeTracker)
      .map((item) => ({
        time: this.timeTracker.nextAttackTime,
        attackDefinition: item.attackDefinition,
        weapon: item.weapon,
      }));
  }

  public performAttack(attackRequest: Optional<AttackRequest, 'time'>) {
    const { attackDefinition, weapon } = attackRequest;

    let time = attackRequest.time;
    if (time === undefined) {
      time = this.timeTracker.nextAttackTime;
    }

    const attackRequestWithTime: AttackRequest = {
      time,
      attackDefinition,
      weapon,
    };
    this.attackRequestNotifier.notify(
      eventIdProvider.getAttackRequestEventId(
        attackRequest.attackDefinition.id
      ),
      attackRequestWithTime
    );

    this.calculateDamageForLastAttack();
  }

  public snapshot(): CombatSimulatorSnapshot {
    const attackTimelines = [];
    const weaponTimelineMap = new Map<Weapon, TimelineSnapshot>();

    // Combine all attack timelines into one, for each weapon
    for (const { weapon, attackDefinition, attackTimeline } of this
      .attackRegistry.items) {
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
      attackTimelines.push(timeline);
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
      attackTimelines,
      buffTimelines,
      damageTimeline,
      damageSummary: damageSummarySnapshot,
    };
  }

  private calculateDamageForLastAttack() {
    const lastAttack = this.attackRegistry.getLastAttack();
    if (lastAttack) {
      this.damageCalculator.calculateDamageUntil(lastAttack.endTime);
    }
  }
}
