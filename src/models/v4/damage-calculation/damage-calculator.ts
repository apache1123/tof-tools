import BigNumber from 'bignumber.js';
import groupBy from 'lodash.groupby';

import { calculateTotalAttack } from '../../../utils/damage-calculation-utils';
import { product, sum } from '../../../utils/math-utils';
import type { Loadout } from '../../loadout';
import type { LoadoutStats } from '../../loadout-stats';
import type { Weapon } from '../../weapon';
import type { Attack } from '../attack/attack';
import type { AttackDamageModifiers } from '../attack/attack-damage-modifiers';
import type { Buff } from '../buff/buff';

/** Based on an attack, calculates all the necessary values to determine the attack's final damage value. e.g. the base attack, total attack, atk%, dmg%, crit% etc. based on an attack's elemental type and the weapon's calculation elemental types */
export class DamageCalculator {
  public constructor(
    private readonly attack: Attack,
    private readonly weapon: Weapon,
    private readonly loadout: Loadout,
    private readonly loadoutStats: LoadoutStats,
    private readonly activeBuffs: Buff[]
  ) {}

  public getBaseDamage(): number {
    const { duration, damageModifiers } = this.attack;
    const { damageDealtIsPerSecond } = damageModifiers;

    // Work out the total attack damage modifiers over the attack's duration if they are defined to be per second. If they are not defined to be per second, the attack damage modifiers are already assumed to be over the attack's duration
    const calculatePerSecondValueToTotal = (value: number) =>
      BigNumber(value).times(duration).dividedBy(1000).toNumber();

    let totalDamageModifiers: Omit<
      AttackDamageModifiers,
      'damageDealtIsPerSecond'
    > = this.attack.damageModifiers;
    if (damageDealtIsPerSecond) {
      totalDamageModifiers = {
        attackMultiplier: calculatePerSecondValueToTotal(
          damageModifiers.attackMultiplier
        ),
        attackFlat: calculatePerSecondValueToTotal(damageModifiers.attackFlat),
        hpMultiplier: calculatePerSecondValueToTotal(
          damageModifiers.hpMultiplier ?? 0
        ),
        sumOfResistancesMultiplier: calculatePerSecondValueToTotal(
          damageModifiers.sumOfResistancesMultiplier ?? 0
        ),
        critFlatMultiplier: calculatePerSecondValueToTotal(
          damageModifiers.critFlatMultiplier ?? 0
        ),
      };
    }

    const {
      attackMultiplier,
      attackFlat,
      hpMultiplier,
      sumOfResistancesMultiplier,
      critFlatMultiplier,
    } = totalDamageModifiers;

    const totalAttack = this.getTotalAttack();
    const critFlat = this.loadout.critFlat;
    const hp = this.loadoutStats.hp;
    const sumOfAllResistances = this.loadoutStats.sumOfAllResistances;

    return BigNumber(totalAttack)
      .times(attackMultiplier)
      .plus(attackFlat)
      .plus(product(critFlat, critFlatMultiplier ?? 0))
      .plus(product(hp, hpMultiplier ?? 0))
      .plus(product(sumOfAllResistances, sumOfResistancesMultiplier ?? 0))
      .toNumber();
  }

  public getFinalDamage(): number {
    return BigNumber(this.getBaseDamage())
      .times(sum(this.getTotalDamagePercent(), 1))
      .times(
        BigNumber(this.getTotalCritPercent())
          .times(this.getTotalCritDamagePercent())
          .plus(1)
      )
      .toNumber();
  }

  public getBaseAttack(): number {
    const calculationElements = this.weapon.calculationElements;
    const elementalAttacks = calculationElements.map((element) =>
      this.loadoutStats.getElementalAttack(element)
    );
    return elementalAttacks.reduce((prev, curr) =>
      curr.baseAttack >= prev.baseAttack ? curr : prev
    ).baseAttack;
  }

  public getTotalAttack(): number {
    return calculateTotalAttack(
      BigNumber(this.getBaseAttack()),
      BigNumber(this.getTotalAttackPercent())
    ).toNumber();
  }

  public getTotalAttackPercent(): number {
    const attackBuffValues = this.activeBuffs
      .filter(
        (buff) =>
          buff.attackBuff &&
          buff.attackBuff.elementalTypes.includes(this.attack.elementalType)
      )
      .map((buff) =>
        product(buff.attackBuff?.value ?? 0, buff.stacks).toNumber()
      );

    return sum(this.getGearAttackPercent(), ...attackBuffValues).toNumber();
  }

  public getTotalDamagePercent(): number {
    // TODO: cannotBeDamageBuffedExceptByTitans
    const damageBuffs = this.activeBuffs.filter(
      (buff) =>
        buff.damageBuff &&
        buff.damageBuff.elementalTypes.includes(this.attack.elementalType)
    );

    const damageBuffsByDamageCategory = groupBy(
      damageBuffs,
      (buff) => buff.damageBuff?.damageCategory
    );

    return product(
      BigNumber(this.getGearDamagePercent()).plus(1).toNumber(),
      ...Object.values(damageBuffsByDamageCategory).map((buffs) =>
        sum(
          ...buffs.map((buff) =>
            product(buff.damageBuff?.value ?? 0, buff.stacks).toNumber()
          ),
          1
        ).toNumber()
      )
    )
      .minus(1)
      .toNumber();
  }

  public getTotalCritPercent(): number {
    return this.loadout.critPercentUnbuffed;
  }

  public getTotalCritDamagePercent(): number {
    return this.loadout.critDamageUnbuffed;
  }

  public getGearAttackPercent(): number {
    return this.weapon.calculationElements
      .map((element) => this.loadout.getGearAttackPercent(element))
      .reduce((prev, curr) => (curr >= prev ? curr : prev));
  }

  public getGearDamagePercent(): number {
    return this.weapon.calculationElements
      .map((element) => this.loadout.getGearElementalDamage(element))
      .reduce((prev, curr) => (curr >= prev ? curr : prev));
  }
}