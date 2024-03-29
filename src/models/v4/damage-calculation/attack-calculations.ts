import BigNumber from 'bignumber.js';
import groupBy from 'lodash.groupby';

import { calculateTotalAttack } from '../../../utils/damage-calculation-utils';
import { product, sum } from '../../../utils/math-utils';
import type { Loadout } from '../../loadout';
import type { LoadoutStats } from '../../loadout-stats';
import type { Weapon } from '../../weapon';
import type { Attack } from '../attack/attack';
import type { AttackBuffDefinition } from '../attack-buff/attack-buff-definition';
import type { DamageBuffDefinition } from '../damage-buff/damage-buff-definition';
import type { EffectInstance } from '../effect/effect-instance';

// TODO: Unsure about this class' naming
export class AttackCalculations {
  public constructor(
    private readonly attack: Attack,
    private readonly weapon: Weapon,
    private readonly loadout: Loadout,
    private readonly loadoutStats: LoadoutStats,
    private readonly activeAttackBuffs: EffectInstance<AttackBuffDefinition>[],
    private readonly activeDamageBuffs: EffectInstance<DamageBuffDefinition>[] // private readonly activeMiscBuffs: EffectInstance<MiscellaneousBuffDefinition>[], // private readonly activeWeaponEffects: EffectInstance<EffectDefinition>[]
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
    const attackBuffs = this.activeAttackBuffs.filter((attackBuff) =>
      attackBuff.definition.elementalTypes.includes(this.attack.elementalType)
    );
    return sum(
      this.getGearAttackBuffValue(),
      ...attackBuffs.map((attackBuff) =>
        product(
          attackBuff.definition.value,
          attackBuff.effect.stacks
        ).toNumber()
      )
    ).toNumber();
  }

  public getTotalDamageBuffValue(): number {
    const damageBuffs = this.activeDamageBuffs.filter((damageBuff) =>
      damageBuff.definition.elementalTypes.includes(this.attack.elementalType)
    );

    const damageBuffsByDamageCategory = groupBy(
      damageBuffs,
      (damageBuff) => damageBuff.definition.damageCategory
    );

    return product(
      BigNumber(this.getGearDamageBuffValue()).plus(1).toNumber(),
      ...Object.values(damageBuffsByDamageCategory).map((damageBuffs) =>
        sum(
          ...damageBuffs.map((damageBuff) =>
            product(
              damageBuff.definition.value,
              damageBuff.effect.stacks
            ).toNumber()
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
