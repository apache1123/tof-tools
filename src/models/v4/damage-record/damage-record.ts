import BigNumber from 'bignumber.js';

import { product, sum } from '../../../utils/math-utils';
import type { Serializable } from '../../persistable';
import type { Buff } from '../buff/buff';
import { ElementalDamageBuffAggregate } from '../buff/elemental-damage-buff-aggregate';
import { FinalDamageBuffAggregate } from '../buff/final-damage-buff-aggregate';
import type { UtilizedBuffs } from '../buff/utilized-buffs';
import type { CombatContext } from '../combat-context/combat-context';
import type { CombatState } from '../combat-context/combat-state';
import { Damage } from '../damage/damage';
import type { EventManager } from '../event/event-manager';
import type { EventSubscriber } from '../event/event-subscriber';
import type { AttackHit } from '../event/messages/attack-hit';
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
    private readonly context: CombatContext,
    private readonly currentTick: CurrentTick,
    private readonly eventManager: EventManager
  ) {}

  public subscribeToEvents() {
    this.eventManager.onAttackHit((attackHit) => {
      this.recordHitDamage(attackHit);
    });
  }

  public recordHitDamage(attackHit: AttackHit) {
    const { currentState } = this.context;
    const baseDamage = this.getBaseDamage(attackHit, currentState);
    const finalDamage = this.getFinalDamage(
      baseDamage,
      attackHit,
      currentState
    );

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

  private getBaseDamage(
    attackHit: AttackHit,
    combatState: CombatState
  ): number {
    const { elementalType, baseDamageModifiers } = attackHit;
    const {
      attackMultiplier,
      attackFlat,
      hpMultiplier,
      sumOfResistancesMultiplier,
      critRateFlatMultiplier,
      resourceAmountMultiplier,
    } = baseDamageModifiers;

    const { elementalAttacks, critRateFlat, hp, elementalResistances } =
      combatState;

    const totalAttack =
      elementalAttacks.getElementalAttack(elementalType).totalAttack;
    const sumOfAllResistances = elementalResistances.getSumOfAllResistances();

    return BigNumber(totalAttack)
      .times(attackMultiplier)
      .plus(attackFlat)
      .plus(product(critRateFlat, critRateFlatMultiplier ?? 0))
      .plus(product(hp, hpMultiplier ?? 0))
      .plus(product(sumOfAllResistances, sumOfResistancesMultiplier ?? 0))
      .times(resourceAmountMultiplier)
      .toNumber();
  }

  private getFinalDamage(
    baseDamage: number,
    attackHit: AttackHit,
    combatState: CombatState
  ): number {
    return product(
      baseDamage,
      sum(this.getElementalDamagePercent(attackHit, combatState), 1),
      sum(this.getFinalDamageBuffPercent(attackHit, combatState), 1),
      product(
        this.getCritRatePercent(combatState),
        this.getCritDamagePercent(combatState)
      ).plus(1),
      BigNumber(1).minus(this.getTargetResistancePercent(combatState))
    ).toNumber();
  }

  private getElementalDamagePercent(
    attackHit: AttackHit,
    combatState: CombatState
  ): number {
    const elementalDamageBuffs = combatState.activeBuffs
      .getElementalDamageBuffs()
      .filter((buff) => buff.canApplyTo(attackHit));

    this.recordUtilizedBuffs(elementalDamageBuffs);

    return new ElementalDamageBuffAggregate(
      elementalDamageBuffs
    ).getAggregatedResult().damagePercentByElement[attackHit.elementalType];
  }

  private getFinalDamageBuffPercent(
    attackHit: AttackHit,
    combatState: CombatState
  ): number {
    const finalDamageBuffs = combatState.activeBuffs
      .getFinalDamageBuffs()
      .filter((buff) => buff.canApplyTo(attackHit));

    this.recordUtilizedBuffs(finalDamageBuffs);

    return new FinalDamageBuffAggregate(finalDamageBuffs).getAggregatedResult()
      .finalDamagePercent;
  }

  private getCritRatePercent(combatState: CombatState): number {
    return combatState.totalCritRatePercent;
  }

  private getCritDamagePercent(combatState: CombatState): number {
    return combatState.totalCritDamagePercent;
  }

  private getTargetResistancePercent(combatState: CombatState): number {
    return combatState.targetResistance;
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
