import type { CoreElementalType } from '../../../definitions/elemental-type';
import {
  calculateTotalAttack,
  calculateTotalCritDamagePercent,
  calculateTotalCritRatePercent,
} from '../../../utils/damage-calculation-utils';
import { sum } from '../../../utils/math-utils';
import { ElementalAttack } from '../../elemental-attack';
import { ElementalAttacks } from '../../elemental-attacks';
import type { Loadout } from '../../loadout';
import type { LoadoutStats } from '../../loadout-stats';
import type { UserStats } from '../../user-stats';
import type { ActiveBuffCollection } from '../buff/active-buff-collection';
import { AttackBuffAggregate } from '../buff/attack-buff-aggregate';
import { BaseAttackBuffAggregate } from '../buff/base-attack-buff-aggregate';
import { CritDamageBuffAggregate } from '../buff/crit-damage-buff-aggregate';
import { CritRateBuffAggregate } from '../buff/crit-rate-buff-aggregate';
import { ElementalResistances } from './elemental-resistances';

export class Character {
  public constructor(
    private readonly userStats: UserStats,
    private readonly loadout: Loadout,
    private readonly loadoutStats: LoadoutStats
  ) {}

  public getElementalAttacks(
    activeBuffs: ActiveBuffCollection
  ): ElementalAttacks {
    return new ElementalAttacks({
      Flame: this.getElementalAttack('Flame', activeBuffs),
      Frost: this.getElementalAttack('Frost', activeBuffs),
      Physical: this.getElementalAttack('Physical', activeBuffs),
      Volt: this.getElementalAttack('Volt', activeBuffs),
    });
  }

  /** The crit rate number (not yet converted to %) in the wanderer stats */
  public getCritRateFlat(): number {
    return this.loadoutStats.critFlat;
  }

  /** The crit rate % in the wanderer stats (= gear crit rate% + buff crit rate%) */
  public getCritRatePercent(activeBuffs: ActiveBuffCollection): number {
    return sum(
      this.getGearCritRatePercent(),
      this.getBuffCritRatePercent(activeBuffs)
    ).toNumber();
  }

  /** The total crit rate % (crit rate % + crit rate flat converted to %) */
  public getTotalCritRatePercent(activeBuffs: ActiveBuffCollection): number {
    return calculateTotalCritRatePercent(
      this.getCritRateFlat(),
      this.userStats.characterLevel,
      this.getGearCritRatePercent(),
      this.getBuffCritRatePercent(activeBuffs)
    ).toNumber();
  }

  public getTotalCritDamagePercent(activeBuffs: ActiveBuffCollection): number {
    return calculateTotalCritDamagePercent(
      this.getBuffCritDamagePercent(activeBuffs)
    ).toNumber();
  }

  public getHp(): number {
    return this.loadoutStats.hp;
  }

  public getElementalResistances(): ElementalResistances {
    return new ElementalResistances(this.loadoutStats.elementalResistances);
  }

  private getElementalAttack(
    element: CoreElementalType,
    activeBuffs: ActiveBuffCollection
  ): ElementalAttack {
    const baseAttack = this.getBaseAttack(element, activeBuffs);
    const attackPercent = this.getAttackPercent(element, activeBuffs);

    const totalAttack = calculateTotalAttack(baseAttack, attackPercent);

    return new ElementalAttack(baseAttack.toNumber(), totalAttack.toNumber());
  }

  private getBaseAttack(
    element: CoreElementalType,
    activeBuffs: ActiveBuffCollection
  ) {
    // In LoadoutStats, only the base attack is used. Total attack needs to be worked out
    const baseAttack = this.loadoutStats.getElementalAttack(element).baseAttack;

    const baseAttackBuffs = activeBuffs.getBaseAttackBuffs();
    const baseAttackBuffValue = new BaseAttackBuffAggregate(
      baseAttackBuffs
    ).getAggregatedResult().baseAttackByElement[element];

    return sum(baseAttack, baseAttackBuffValue);
  }

  private getAttackPercent(
    element: CoreElementalType,
    activeBuffs: ActiveBuffCollection
  ) {
    const gearAttackPercent = this.loadout.getGearAttackPercent(element);

    const attackBuffs = activeBuffs.getAttackBuffs();
    const buffAttackPercent = new AttackBuffAggregate(
      attackBuffs
    ).getAggregatedResult().attackPercentByElement[element];

    return sum(gearAttackPercent, buffAttackPercent);
  }

  private getGearCritRatePercent() {
    return this.loadout.gearCritPercent;
  }

  private getBuffCritRatePercent(activeBuffs: ActiveBuffCollection): number {
    const critRateBuffs = activeBuffs.getCritRateBuffs();
    const aggregatedResult = new CritRateBuffAggregate(
      critRateBuffs
    ).getAggregatedResult();
    return aggregatedResult.critRatePercent;
  }

  private getBuffCritDamagePercent(activeBuffs: ActiveBuffCollection) {
    const critDamageBuffs = activeBuffs.getCritDamageBuffs();
    const aggregatedResult = new CritDamageBuffAggregate(
      critDamageBuffs
    ).getAggregatedResult();
    return aggregatedResult.critDamagePercent;
  }
}
