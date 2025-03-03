import BigNumber from "bignumber.js";

import { product, sum } from "../../utils/math-utils";
import { critDamageBuffAggregator } from "../buff/crit-damage-buff/crit-damage-buff-aggregator";
import { critRateBuffAggregator } from "../buff/crit-rate-buff/crit-rate-buff-aggregator";
import { elementalDamageBuffAggregator } from "../buff/elemental-damage-buff/elemental-damage-buff-aggregator";
import { finalDamageBuffAggregator } from "../buff/final-damage-buff/final-damage-buff-aggregator";
import type { Character } from "../character/character";
import { Damage } from "../damage/damage";
import type { ElementalAttack } from "../elemental-attack/elemental-attack";
import type { AttackHit } from "../event/messages/attack-hit";
import type { Target } from "../target/target";

export class DamageEvent {
  public constructor(
    private readonly attackHit: AttackHit,
    private readonly character: Character,
    private readonly target: Target,
  ) {}

  public getDamage(): Damage {
    return new Damage(this.getBaseDamage(), this.getFinalDamage());
  }

  public getAttack(): ElementalAttack {
    return this.character.getAttack(this.attackHit.damageElement);
  }

  public getBaseAttackBuffs() {
    // Attack buffs don't get filtered by attack hit. We assume all attack buffs apply to all attack hits, as long as the element matches
    return this.character.getBaseAttackBuffs(this.attackHit.damageElement);
  }

  public getAttackPercentBuffs() {
    // Attack buffs don't get filtered by attack hit. We assume all attack buffs apply to all attack hits, as long as the element matches
    return this.character.getAttackPercentBuffs(this.attackHit.damageElement);
  }

  public getElementalDamageBuffs() {
    return this.character
      .getElementalDamageBuffs(this.attackHit.damageElement)
      .filter((buff) => buff.canApplyTo(this.attackHit));
  }

  public getFinalDamageBuffs() {
    return this.character
      .getFinalDamageBuffs()
      .filter((buff) => buff.canApplyTo(this.attackHit));
  }

  public getCritRateBuffs() {
    return this.character
      .getCritRateBuffs()
      .filter((buff) => buff.canApplyTo(this.attackHit));
  }

  public getCritDamageBuffs() {
    return this.character
      .getCritDamageBuffs()
      .filter((buff) => buff.canApplyTo(this.attackHit));
  }

  private getBaseDamage(): number {
    const { baseDamageModifiers } = this.attackHit;
    const {
      attackMultiplier,
      attackFlat,
      hpMultiplier,
      sumOfResistancesMultiplier,
      critRateFlatMultiplier,
      resourceAmountMultiplier,
    } = baseDamageModifiers;

    const totalAttack = this.getAttack().totalAttack;

    const sumOfAllResistances = this.character.getSumOfAllResistances();

    return BigNumber(totalAttack)
      .times(attackMultiplier)
      .plus(attackFlat)
      .plus(product(this.getCritFlat(), critRateFlatMultiplier ?? 0))
      .plus(product(this.getHp(), hpMultiplier ?? 0))
      .plus(product(sumOfAllResistances, sumOfResistancesMultiplier ?? 0))
      .times(resourceAmountMultiplier)
      .toNumber();
  }

  private getFinalDamage(): number {
    return product(
      this.getBaseDamage(),
      sum(this.getElementalDamagePercent(), 1),
      sum(this.getFinalDamageBuffPercent(), 1),
      product(this.getCritRatePercent(), this.getCritDamagePercent()).plus(1),
      BigNumber(1).minus(this.getTargetResistancePercent()),
    ).toNumber();
  }

  private getElementalDamagePercent(): number {
    return elementalDamageBuffAggregator(this.getElementalDamageBuffs())
      .totalValueByElement[this.attackHit.damageElement];
  }

  private getFinalDamageBuffPercent(): number {
    return finalDamageBuffAggregator(this.getFinalDamageBuffs()).totalValue;
  }

  private getCritFlat() {
    return this.character.getCritRateFlat();
  }

  private getCritRatePercent(): number {
    return critRateBuffAggregator(this.getCritRateBuffs()).totalValue;
  }

  private getCritDamagePercent(): number {
    return critDamageBuffAggregator(this.getCritDamageBuffs()).totalValue;
  }

  private getHp() {
    return this.character.getHp();
  }

  private getTargetResistancePercent(): number {
    return this.target.resistance;
  }
}
