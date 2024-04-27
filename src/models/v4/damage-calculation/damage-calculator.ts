import BigNumber from 'bignumber.js';
import groupBy from 'lodash.groupby';

import { titanRareStatDamageCategories } from '../../../constants/damage-category';
import { calculateTotalAttack } from '../../../utils/damage-calculation-utils';
import { product, sum } from '../../../utils/math-utils';
import { oneSecondDuration } from '../../../utils/time-utils';
import type { Loadout } from '../../loadout';
import type { LoadoutStats } from '../../loadout-stats';
import type { Weapon } from '../../weapon';
import type { AttackAction } from '../attack/attack-action';
import type { AttackDamageModifiers } from '../attack/attack-damage-modifiers';
import type { BuffAction } from '../buff/buff-action';
import type { ResourceRegistry } from '../resource/resource-registry';

/** Based on an attack and its time interval, calculates all the necessary values to determine the attack's final damage value. e.g. the base attack, total attack, atk%, dmg%, crit% etc. based on an attack's elemental type and the weapon's calculation elemental types */
export class DamageCalculator {
  public constructor(
    private readonly attackAction: AttackAction,
    private readonly weapon: Weapon,
    private readonly loadout: Loadout,
    private readonly loadoutStats: LoadoutStats,
    /** Buff actions during the attackAction's duration */
    private readonly buffActions: BuffAction[],
    private readonly resourceRegistry: ResourceRegistry
  ) {}

  public getBaseDamage(): number {
    const { startTime, duration, damageModifiers } = this.attackAction;
    const {
      damageDealtIsPerSecond,
      resourceAmountMultiplier: resourceAmountMultiplierDefinition,
    } = damageModifiers;

    // Work out the total attack damage modifiers over the attack's duration if they are defined to be per second. If they are not defined to be per second, the attack damage modifiers are already assumed to be over the attack's duration. This only needs to be done for values that are to be the addend, or a multiplier of an addend. For factors, this does not need to be done.
    // e.g. Base damage = ((totalAttack * attackMultiplier) + attackFlat + (hp * hpMultiplier)) * resourceAmountMultiplier
    // Here: attackMultiplier, attackFlat, hpMultiplier need to be adjusted, but resourceAmountMultiplier will not change
    const calculatePerSecondValueToTotal = (value: number) =>
      BigNumber(value).times(duration).dividedBy(oneSecondDuration).toNumber();

    let totalDamageModifiers: Omit<
      AttackDamageModifiers,
      'damageDealtIsPerSecond'
    > = damageModifiers;

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

    let resourceAmountMultiplier = 1;
    if (resourceAmountMultiplierDefinition) {
      const { resourceId } = resourceAmountMultiplierDefinition;
      const resource = this.resourceRegistry.getResource(resourceId);
      if (!resource) throw new Error(`Cannot find resource: ${resourceId}`);

      const resourceAmount = resource.getCumulatedAmount(startTime);

      if (resourceAmount) {
        resourceAmountMultiplier = BigNumber(
          resourceAmountMultiplierDefinition.multiplier
        )
          .times(resourceAmount)
          .toNumber();
      }
    }

    return BigNumber(totalAttack)
      .times(attackMultiplier)
      .plus(attackFlat)
      .plus(product(critFlat, critFlatMultiplier ?? 0))
      .plus(product(hp, hpMultiplier ?? 0))
      .plus(product(sumOfAllResistances, sumOfResistancesMultiplier ?? 0))
      .times(resourceAmountMultiplier)
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
    const attackBuffValues = this.buffActions
      .flatMap((buffAction) =>
        buffAction.attackBuffs
          .filter((attackBuff) =>
            attackBuff.elementalTypes.includes(this.attackAction.elementalType)
          )
          .map((attackBuff) => ({ attackBuff, stacks: buffAction.stacks }))
      )
      .map((buff) => product(buff.attackBuff.value, buff.stacks).toNumber());

    return sum(this.getGearAttackPercent(), ...attackBuffValues).toNumber();
  }

  public getTotalDamagePercent(): number {
    const {
      attackId,
      damageModifiers: { canOnlyBeBuffedByTitans },
      weapon,
      type,
    } = this.attackAction;

    const damageBuffs = this.buffActions.flatMap((buffAction) =>
      buffAction.damageBuffs
        .filter(
          (damageBuff) =>
            damageBuff.elementalTypes.includes(
              this.attackAction.elementalType
            ) &&
            // TODO: these below should be refactored
            (!canOnlyBeBuffedByTitans ||
              titanRareStatDamageCategories.includes(
                damageBuff.damageCategory
              )) &&
            (!damageBuff.appliesTo?.weapon ||
              damageBuff.appliesTo.weapon === weapon.id) &&
            (!damageBuff.appliesTo?.attackType ||
              damageBuff.appliesTo.attackType === type) &&
            (!damageBuff.appliesTo?.attacks ||
              damageBuff.appliesTo.attacks.includes(attackId))
        )
        .map((damageBuff) => ({ damageBuff, stacks: buffAction.stacks }))
    );

    const damageBuffsByDamageCategory = groupBy(
      damageBuffs,
      (buff) => buff.damageBuff.damageCategory
    );

    return product(
      BigNumber(this.getGearDamagePercent()).plus(1).toNumber(),
      ...Object.values(damageBuffsByDamageCategory).map((buffs) =>
        sum(
          ...buffs.map((buff) =>
            product(buff.damageBuff.value ?? 0, buff.stacks).toNumber()
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
