import BigNumber from 'bignumber.js';

import { calculateOverlapDuration } from '../../../utils/time-interval-utils';
import type { Loadout } from '../../loadout';
import type { LoadoutStats } from '../../loadout-stats';
import type { Team } from '../../team';
import type { AttackRegistry } from '../attack/attack-registry';
import type { BuffRegistry } from '../buff/buff-registry';
import type { CombatDamageSummary } from '../combat-damage-summary/combat-damage-summary';
import { Damage } from '../damage-summary/damage';
import { DamageSummary } from '../damage-summary/damage-summary';
import type { ResourceRegistry } from '../resource/resource-registry';
import type { Target } from '../target/target';
import type { TickTracker } from '../tick-tracker';
import { DamageCalculator } from './damage-calculator';

export class DamageTimelineCalculator {
  public constructor(
    private readonly combatDamageSummary: CombatDamageSummary,
    private readonly loadout: Loadout,
    private readonly loadoutStats: LoadoutStats,
    private readonly team: Team,
    private readonly tickTracker: TickTracker,
    private readonly attackRegistry: AttackRegistry,
    private readonly buffRegistry: BuffRegistry,
    private readonly resourceRegistry: ResourceRegistry,
    private readonly target: Target
  ) {}

  public calculateDamage() {
    const timeInterval = this.tickTracker.currentTickInterval;

    const damageSummary = new DamageSummary(
      timeInterval.duration,
      ...this.team.weapons
    );

    const attackEvents = this.attackRegistry.getActiveEvents();
    const buffEvents = this.buffRegistry.getActiveEvents();

    let activeWeaponTotalAttack: number | undefined;
    for (const attackEvent of attackEvents) {
      const { type, elementalType, isActiveWeaponAttack, weapon } = attackEvent;

      const damageCalculator = new DamageCalculator(
        attackEvent,
        weapon,
        this.loadout,
        this.loadoutStats,
        buffEvents,
        this.resourceRegistry,
        this.target
      );

      // This is the base damage + final damage of the whole attack. Since the attack time interval is likely not the same as the tick interval, we need to take a portion of the damage that's equal to the overlapping duration of the attack interval and the tick interval.
      // NOTE: A compromise is made averaging out the attack's damage over its duration, for simplicity
      const baseDamageOfEntireAttack = damageCalculator.getBaseDamage();
      const finalDamageOfEntireAttack = damageCalculator.getFinalDamage();

      const overlappingDuration = calculateOverlapDuration(
        attackEvent.timeInterval,
        timeInterval
      );

      const baseDamage = BigNumber(baseDamageOfEntireAttack)
        .times(overlappingDuration)
        .dividedBy(attackEvent.duration);
      const finalDamage = BigNumber(finalDamageOfEntireAttack)
        .times(overlappingDuration)
        .dividedBy(attackEvent.duration);

      const weaponDamageSummary = damageSummary.weaponDamageSummaries.get(
        weapon.id
      );
      if (!weaponDamageSummary) {
        throw new Error(
          'Cannot find weapon damage summary to store attack damage result'
        );
      }

      weaponDamageSummary.attackTypeDamageSummaries[type].elementalTypeDamages[
        elementalType
      ] = weaponDamageSummary.attackTypeDamageSummaries[
        type
      ].elementalTypeDamages[elementalType].add(
        new Damage(baseDamage.toNumber(), finalDamage.toNumber())
      );

      if (isActiveWeaponAttack)
        activeWeaponTotalAttack = damageCalculator.getTotalAttack();
    }

    // If there is no active weapon attack in this time period (it's possible to only have passive attacks), use the previous one. There should always be at least one as combat is started with an active weapon attack
    if (activeWeaponTotalAttack === undefined) {
      const previousDamageSummary =
        this.combatDamageSummary.lastDamageSummaryEvent;

      if (!previousDamageSummary)
        throw new Error('The active weapon total attack cannot be determined');

      activeWeaponTotalAttack = previousDamageSummary.activeWeaponTotalAttack;
    }

    this.combatDamageSummary.addDamageSummary(
      timeInterval,
      damageSummary,
      activeWeaponTotalAttack
    );
  }
}
