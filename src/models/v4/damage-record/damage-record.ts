import BigNumber from 'bignumber.js';

import type { WeaponElementalType } from '../../../definitions/elemental-type';
import { product, sum } from '../../../utils/math-utils';
import type { Serializable } from '../../persistable';
import type { ActiveBuffs } from '../buff/active-buff/active-buffs';
import type { Buff } from '../buff/buff';
import { ElementalDamageBuffAggregate } from '../buff/elemental-damage-buff-aggregate';
import { FinalDamageBuffAggregate } from '../buff/final-damage-buff-aggregate';
import type { UtilizedBuffs } from '../buff/utilized-buffs';
import type { CurrentCharacterStats } from '../character/current-character-stats';
import { Damage } from '../damage/damage';
import type { EventManager } from '../event/event-manager';
import type { EventSubscriber } from '../event/event-subscriber';
import type { AttackHit } from '../event/messages/attack-hit';
import type { Target } from '../target/target';
import type { CurrentTick } from '../tick/current-tick';
import { DamageRecordEvent } from './damage-record-event';
import type { DamageRecordTimeline } from './damage-record-timeline';
import type { DamageRecordDto } from './dtos/damage-record-dto';

/** A record (timeline) of damages during combat */
export class DamageRecord
  implements EventSubscriber, Serializable<DamageRecordDto>
{
  public constructor(
    private readonly timeline: DamageRecordTimeline,
    private readonly utilizedBuffs: UtilizedBuffs,
    private readonly currentTick: CurrentTick,
    private readonly eventManager: EventManager,
    private readonly target: Target,
    private readonly activeBuffs: ActiveBuffs,
    private readonly currentCharacterStats: CurrentCharacterStats
  ) {}

  public subscribeToEvents() {
    this.eventManager.onAttackHit((attackHit) => {
      this.recordHitDamage(attackHit);
    });
  }

  public recordHitDamage(attackHit: AttackHit) {
    const baseDamage = this.getBaseDamage(attackHit);
    const finalDamage = this.getFinalDamage(baseDamage, attackHit);

    this.timeline.addEvent(
      new DamageRecordEvent(
        this.currentTick.value,
        new Damage(baseDamage, finalDamage),
        attackHit.weapon,
        attackHit.attackType,
        attackHit.elementalType
      )
    );
  }

  private getBaseDamage(attackHit: AttackHit): number {
    const { elementalType, baseDamageModifiers } = attackHit;
    const {
      attackMultiplier,
      attackFlat,
      hpMultiplier,
      sumOfResistancesMultiplier,
      critRateFlatMultiplier,
      resourceAmountMultiplier,
    } = baseDamageModifiers;

    const totalAttack = this.getTotalAttack(elementalType);

    const sumOfAllResistances = this.currentCharacterStats
      .getElementalResistances()
      .getSumOfAllResistances();

    return BigNumber(totalAttack)
      .times(attackMultiplier)
      .plus(attackFlat)
      .plus(product(this.getCritFlat(), critRateFlatMultiplier ?? 0))
      .plus(product(this.getHp(), hpMultiplier ?? 0))
      .plus(product(sumOfAllResistances, sumOfResistancesMultiplier ?? 0))
      .times(resourceAmountMultiplier)
      .toNumber();
  }

  private getFinalDamage(baseDamage: number, attackHit: AttackHit): number {
    return product(
      baseDamage,
      sum(this.getElementalDamagePercent(attackHit), 1),
      sum(this.getFinalDamageBuffPercent(attackHit), 1),
      product(this.getCritRatePercent(), this.getCritDamagePercent()).plus(1),
      BigNumber(1).minus(this.getTargetResistancePercent())
    ).toNumber();
  }

  private getElementalDamagePercent(attackHit: AttackHit): number {
    const elementalDamageBuffs = this.activeBuffs
      .getElementalDamageBuffs()
      .filter((buff) => buff.canApplyTo(attackHit));

    this.recordUtilizedBuffs(elementalDamageBuffs);

    return new ElementalDamageBuffAggregate(
      elementalDamageBuffs
    ).getAggregatedResult().damagePercentByElement[attackHit.elementalType];
  }

  private getFinalDamageBuffPercent(attackHit: AttackHit): number {
    const finalDamageBuffs = this.activeBuffs
      .getFinalDamageBuffs()
      .filter((buff) => buff.canApplyTo(attackHit));

    this.recordUtilizedBuffs(finalDamageBuffs);

    return new FinalDamageBuffAggregate(finalDamageBuffs).getAggregatedResult()
      .finalDamagePercent;
  }

  private getTotalAttack(elementalType: WeaponElementalType) {
    return this.currentCharacterStats.getElementalAttack(elementalType)
      .totalAttack;
  }

  private getCritFlat() {
    return this.currentCharacterStats.getCritRateFlat();
  }

  private getCritRatePercent(): number {
    return this.currentCharacterStats.getTotalCritRatePercent();
  }

  private getCritDamagePercent(): number {
    return this.currentCharacterStats.getTotalCritDamagePercent();
  }

  private getHp() {
    return this.currentCharacterStats.getHp();
  }

  private getTargetResistancePercent(): number {
    return this.target.resistance;
  }

  private recordUtilizedBuffs(buffs: Buff[]) {
    for (const buff of buffs) {
      this.utilizedBuffs.add(buff.id);
    }
  }

  public toDto(): DamageRecordDto {
    const { timeline } = this;
    return {
      timeline: timeline.toDto(),
      version: 1,
    };
  }
}
