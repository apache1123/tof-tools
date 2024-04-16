import BigNumber from 'bignumber.js';

import { tickDuration } from '../../../constants/tick';
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
import { DamageCalculator } from './damage-calculator';

export class DamageTimelineCalculator {
  public constructor(
    private readonly damageSummaryTimeline: DamageSummaryTimeline,
    private readonly loadout: Loadout,
    private readonly loadoutStats: LoadoutStats,
    private readonly team: Team,
    private readonly attackRegistry: AttackRegistry,
    private readonly buffRegistry: BuffRegistry
  ) {}

  public calculateDamage(timePeriod: TimePeriod) {
    const damageSummary = new DamageSummary(tickDuration, ...this.team.weapons);

    const attackActions = this.attackRegistry.getAttackActions(timePeriod);
    const buffActions = this.buffRegistry.getActiveBuffActions(timePeriod);

    for (const attackAction of attackActions) {
      const { type, elementalType, weapon } = attackAction;
      const attackCalculator = new DamageCalculator(
        attackAction,
        weapon,
        this.loadout,
        this.loadoutStats,
        buffActions
      );

      // This is the base damage + final damage of the whole attack. Since the attack time period is likely not the same as the tick period, we need to take a portion of the damage that's equal to the overlapping duration of the attack period and the tick period.
      // NOTE: A compromise is made averaging out the attack's damage over its duration, for simplicity
      const baseDamageOfEntireAttack = attackCalculator.getBaseDamage();
      const finalDamageOfEntireAttack = attackCalculator.getFinalDamage();

      const attackPeriod = new TimePeriod(
        attackAction.startTime,
        attackAction.endTime
      );
      const overlappingDuration = calculateOverlapDuration(
        attackPeriod,
        timePeriod
      );

      const baseDamage = BigNumber(baseDamageOfEntireAttack)
        .times(overlappingDuration)
        .dividedBy(attackAction.duration);
      const finalDamage = BigNumber(finalDamageOfEntireAttack)
        .times(overlappingDuration)
        .dividedBy(attackAction.duration);

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
    }

    this.damageSummaryTimeline.addDamageSummary(
      damageSummary,
      timePeriod.startTime,
      timePeriod.duration
    );
  }
}
