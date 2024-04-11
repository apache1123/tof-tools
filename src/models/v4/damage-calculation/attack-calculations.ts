import BigNumber from 'bignumber.js';
import groupBy from 'lodash.groupby';

import { calculateTotalAttack } from '../../../utils/damage-calculation-utils';
import { product, sum } from '../../../utils/math-utils';
import type { Loadout } from '../../loadout';
import type { LoadoutStats } from '../../loadout-stats';
import type { Weapon } from '../../weapon';
import type { Attack } from '../attack/attack';
import type { Buff } from '../buff/buff';

// TODO: Unsure about this class' naming
export class AttackCalculations {
  public constructor(
    private readonly attack: Attack,
    private readonly weapon: Weapon,
    private readonly loadout: Loadout,
    private readonly loadoutStats: LoadoutStats,
    private readonly activeBuffs: Buff[]
  ) {}

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
      BigNumber(this.getTotalAttackBuffValue())
    ).toNumber();
  }

  public getTotalAttackBuffValue(): number {
    const attackBuffValues = this.activeBuffs
      .filter(
        (buff) =>
          buff.attackBuff &&
          buff.attackBuff.elementalTypes.includes(this.attack.elementalType)
      )
      .map((buff) =>
        product(buff.attackBuff?.value ?? 0, buff.stacks).toNumber()
      );

    return sum(this.getGearAttackBuffValue(), ...attackBuffValues).toNumber();
  }

  public getTotalDamageBuffValue(): number {
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
      BigNumber(this.getGearDamageBuffValue()).plus(1).toNumber(),
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

  public getTotalCritValue(): number {
    return this.loadout.critPercentUnbuffed;
  }

  public getTotalCritDamageValue(): number {
    return this.loadout.critDamageUnbuffed;
  }

  public getGearAttackBuffValue(): number {
    return this.weapon.calculationElements
      .map((element) => this.loadout.getGearAttackPercent(element))
      .reduce((prev, curr) => (curr >= prev ? curr : prev));
  }

  public getGearDamageBuffValue(): number {
    return this.weapon.calculationElements
      .map((element) => this.loadout.getGearElementalDamage(element))
      .reduce((prev, curr) => (curr >= prev ? curr : prev));
  }
}
