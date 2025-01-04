import BigNumber from "bignumber.js";

import type { WeaponElementalType } from "../../definitions/elemental-type";
import { product, sum } from "../../utils/math-utils";
import type { ActiveBuffs } from "../buff/active-buff/active-buffs";
import type { Buff } from "../buff/buff";
import { ElementalDamageBuff } from "../buff/elemental-damage-buff/elemental-damage-buff";
import { ElementalDamageBuffAggregate } from "../buff/elemental-damage-buff/elemental-damage-buff-aggregate";
import { FinalDamageBuffAggregate } from "../buff/final-damage-buff/final-damage-buff-aggregate";
import type { Character } from "../character/character";
import { Damage } from "../damage/damage";
import type { AttackHit } from "../event/messages/attack-hit";
import type { Target } from "../target/target";

export class DamageEvent {
  public constructor(
    private readonly attackHit: AttackHit,
    private readonly character: Character,
    private readonly target: Target,
    private readonly activeBuffs: ActiveBuffs,
  ) {}

  public getDamage(): Damage {
    return new Damage(this.getBaseDamage(), this.getFinalDamage());
  }

  public getUtilizedBuffs(): Buff[] {
    return [
      ...this.character.getUtilizedBuffs(),
      ...this.getElementalDamageBuffs(),
      ...this.getFinalDamageBuffs(),
    ];
  }

  private getBaseDamage(): number {
    const { damageElement, baseDamageModifiers } = this.attackHit;
    const {
      attackMultiplier,
      attackFlat,
      hpMultiplier,
      sumOfResistancesMultiplier,
      critRateFlatMultiplier,
      resourceAmountMultiplier,
    } = baseDamageModifiers;

    const totalAttack = this.getTotalAttack(damageElement);

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
    return new ElementalDamageBuffAggregate(
      this.getElementalDamageBuffs(),
    ).getAggregatedResult().damagePercentByElement[
      this.attackHit.damageElement
    ];
  }

  private getElementalDamageBuffs() {
    return [
      this.getGearElementalDamageBuff(),
      ...this.activeBuffs
        .getElementalDamageBuffs()
        .filter((buff) => buff.canApplyTo(this.attackHit)),
    ];
  }

  private getGearElementalDamageBuff(): ElementalDamageBuff {
    const element = this.attackHit.damageElement;
    return new ElementalDamageBuff(
      `gear-${element}-elemental-damage`,
      this.character.getGearDamagePercent(element),
      "gear",
      {},
      element,
    );
  }

  private getFinalDamageBuffPercent(): number {
    return new FinalDamageBuffAggregate(
      this.getFinalDamageBuffs(),
    ).getAggregatedResult().finalDamagePercent;
  }

  private getFinalDamageBuffs() {
    return this.activeBuffs
      .getFinalDamageBuffs()
      .filter((buff) => buff.canApplyTo(this.attackHit));
  }

  private getTotalAttack(elementalType: WeaponElementalType) {
    return this.character.getAttack(elementalType).totalAttack;
  }

  private getCritFlat() {
    return this.character.getCritRateFlat();
  }

  private getCritRatePercent(): number {
    return this.character.getTotalCritRatePercent();
  }

  private getCritDamagePercent(): number {
    return this.character.getTotalCritDamagePercent();
  }

  private getHp() {
    return this.character.getHp();
  }

  private getTargetResistancePercent(): number {
    return this.target.resistance;
  }
}
