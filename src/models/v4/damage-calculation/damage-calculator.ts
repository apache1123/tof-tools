import BigNumber from 'bignumber.js';

import { tickDuration } from '../../../constants/tick';
import {
  calculateBaseDamage,
  calculateFinalDamage,
} from '../../../utils/damage-calculation-utils';
import { calculateOverlapDuration } from '../../../utils/time-period-utils';
import type { Loadout } from '../../loadout';
import type { LoadoutStats } from '../../loadout-stats';
import type { Team } from '../../team';
import type { AttackRegistry } from '../attack/attack-registry';
import type { BuffRegistry } from '../buff/buff-registry';
import { Damage } from '../damage-summary/damage';
import { DamageSummary } from '../damage-summary/damage-summary';
import type { DamageSummaryTimeline } from '../damage-summary-timeline/damage-summary-timeline';
import { TimePeriod } from '../time-period';
import { AttackCalculations } from './attack-calculations';

export class DamageCalculator {
  private damageLastCalculatedAt = 0;

  public constructor(
    private readonly damageSummaryTimeline: DamageSummaryTimeline,
    private readonly loadout: Loadout,
    private readonly loadoutStats: LoadoutStats,
    private readonly team: Team,
    private readonly attackRegistry: AttackRegistry,
    private readonly buffRegistry: BuffRegistry
  ) {}

  public calculateDamageUntil(endTime: number) {
    for (
      let tickPeriodStart = this.damageLastCalculatedAt;
      tickPeriodStart <= endTime - tickDuration;
      tickPeriodStart = tickPeriodStart + tickDuration
    ) {
      const damageSummary = new DamageSummary(
        tickDuration,
        ...this.team.weapons
      );

      const tickPeriodEnd = tickPeriodStart + tickDuration;
      const tickPeriod = new TimePeriod(tickPeriodStart, tickPeriodEnd);

      const attacks = this.attackRegistry.getAttacks(tickPeriod);
      const buffs = this.buffRegistry.getActiveBuffs(tickPeriod);

      for (const attack of attacks) {
        const { damageModifiers, type, elementalType, weapon } = attack;
        const attackCalculations = new AttackCalculations(
          attack,
          weapon,
          this.loadout,
          this.loadoutStats,
          buffs
        );

        // This is the base damage + final damage of the whole attack. Since the attack time period is likely not the same as the tick period, we need to take a portion of the damage that's equal to the overlapping duration of the attack period and the tick period.
        // NOTE: A compromise is made averaging out the attack's damage over its duration, for simplicity
        const baseDamageOfEntireAttack = calculateBaseDamage(
          BigNumber(attackCalculations.getTotalAttack()),
          damageModifiers
        );
        const finalDamageOfEntireAttack = calculateFinalDamage(
          baseDamageOfEntireAttack,
          BigNumber(attackCalculations.getTotalDamageBuffValue()),
          BigNumber(attackCalculations.getTotalCritValue()),
          BigNumber(attackCalculations.getTotalCritDamageValue())
        );

        const attackPeriod = new TimePeriod(attack.startTime, attack.endTime);
        const overlappingDuration = calculateOverlapDuration(
          attackPeriod,
          tickPeriod
        );

        const baseDamage = baseDamageOfEntireAttack
          .times(overlappingDuration)
          .dividedBy(attack.duration);
        const finalDamage = finalDamageOfEntireAttack
          .times(overlappingDuration)
          .dividedBy(attack.duration);

        const weaponDamageSummary = damageSummary.weaponDamageSummaries.get(
          weapon.id
        );
        if (!weaponDamageSummary) {
          throw new Error(
            'Cannot find weapon damage summary to store attack damage result'
          );
        }

        weaponDamageSummary.attackTypeDamageSummaries[
          type
        ].elementalTypeDamages[elementalType] =
          weaponDamageSummary.attackTypeDamageSummaries[
            type
          ].elementalTypeDamages[elementalType].add(
            new Damage(baseDamage.toNumber(), finalDamage.toNumber())
          );
      }

      this.damageSummaryTimeline.addDamageSummary(
        damageSummary,
        tickPeriodStart,
        tickDuration
      );

      this.damageLastCalculatedAt = tickPeriodEnd;
    }
  }
}
