import BigNumber from 'bignumber.js';

import { tickDuration } from '../../../constants/tick';
import {
  calculateBaseDamage,
  calculateFinalDamage,
} from '../../../utils/damage-calculation-utils';
import { calculateOverlapDuration } from '../../../utils/time-period-utils';
import type { Loadout } from '../../loadout';
import type { LoadoutStats } from '../../loadout-stats';
import type { TeamAttackController } from '../attack/team-attack-controller';
import { Damage } from '../damage-summary/damage';
import { DamageSummary } from '../damage-summary/damage-summary';
import type { DamageSummaryTimeline } from '../damage-summary-timeline/damage-summary-timeline';
import type { EffectRegistry } from '../effect/effect-registry';
import type { TimePeriod } from '../time-period';
import { AttackCalculations } from './attack-calculations';

export class DamageCalculator {
  private damageLastCalculatedAt = 0;

  public constructor(
    private readonly damageSummaryTimeline: DamageSummaryTimeline,
    private readonly loadout: Loadout,
    private readonly loadoutStats: LoadoutStats,
    private readonly teamAttackController: TeamAttackController,
    private readonly effectRegistry: EffectRegistry
  ) {}

  public calculateDamageUntil(endTime: number) {
    for (
      let tickPeriodStart = this.damageLastCalculatedAt;
      tickPeriodStart <= endTime - tickDuration;
      tickPeriodStart = tickPeriodStart + tickDuration
    ) {
      const damageSummary = new DamageSummary(
        ...this.teamAttackController.weapons
      );

      const tickPeriodEnd = tickPeriodStart + tickDuration;
      const tickPeriod: TimePeriod = {
        startTime: tickPeriodStart,
        endTime: tickPeriodEnd,
      };

      const attackBuffs = this.effectRegistry.getActiveAttackBuffs(tickPeriod);
      const damageBuffs = this.effectRegistry.getActiveDamageBuffs(tickPeriod);

      // TODO:
      const miscBuffs =
        this.effectRegistry.getActiveMiscellaneousBuffs(tickPeriod);
      const weaponEffects =
        this.effectRegistry.getActiveWeaponEffects(tickPeriod);

      for (const [weapon, weaponAttackController] of this.teamAttackController
        .weaponAttackControllers) {
        const attacks =
          weaponAttackController.combinedAttackTimeline.getAttacksOverlappingPeriod(
            tickPeriodStart,
            tickPeriodEnd
          );

        for (const attack of attacks) {
          const { damageModifiers, type, elementalType } = attack;
          const attackCalculations = new AttackCalculations(
            attack,
            weapon,
            this.loadout,
            this.loadoutStats,
            attackBuffs,
            damageBuffs
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

          const overlappingDuration = calculateOverlapDuration(
            { startTime: attack.startTime, endTime: attack.endTime },
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
