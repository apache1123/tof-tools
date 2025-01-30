import groupBy from "lodash.groupby";

import type { WeaponElementalType } from "../../definitions/elemental-type";
import { keysOf } from "../../utils/object-utils";
import type { AttackPercentBuff } from "../buff/attack-percent-buff/attack-percent-buff";
import { attackPercentBuffAggregator } from "../buff/attack-percent-buff/attack-percent-buff-aggregator";
import type { BaseAttackBuff } from "../buff/base-attack-buff/base-attack-buff";
import { baseAttackBuffAggregator } from "../buff/base-attack-buff/base-attack-buff-aggregator";
import type { Buff } from "../buff/buff";
import type { BuffAbilities } from "../buff/buff-abilities";
import type { BuffAggregator } from "../buff/buff-aggregator/buff-aggregator";
import type { ElementalBuffAggregator } from "../buff/buff-aggregator/elemental-buff-aggregator";
import type { CritDamageBuff } from "../buff/crit-damage-buff/crit-damage-buff";
import { critDamageBuffAggregator } from "../buff/crit-damage-buff/crit-damage-buff-aggregator";
import type { CritRateBuff } from "../buff/crit-rate-buff/crit-rate-buff";
import { critRateBuffAggregator } from "../buff/crit-rate-buff/crit-rate-buff-aggregator";
import type { ElementalBuff } from "../buff/elemental-buff";
import type { ElementalDamageBuff } from "../buff/elemental-damage-buff/elemental-damage-buff";
import { elementalDamageBuffAggregator } from "../buff/elemental-damage-buff/elemental-damage-buff-aggregator";
import type { FinalDamageBuff } from "../buff/final-damage-buff/final-damage-buff";
import { finalDamageBuffAggregator } from "../buff/final-damage-buff/final-damage-buff-aggregator";
import type { BuffSummaryItem } from "./buff-summary-item";
import type { BuffSummaryItemGroup } from "./buff-summary-item-group";

/** A summary of buffs used for a single element */
export interface BuffSummary {
  element: WeaponElementalType;
  baseAttackBuffs: BuffSummaryItemGroup;
  attackPercentBuffs: BuffSummaryItemGroup;
  elementalDamageBuffs: BuffSummaryItemGroup;
  finalDamageBuffs: BuffSummaryItemGroup;
  critRateBuffs: BuffSummaryItemGroup;
  critDamageBuffs: BuffSummaryItemGroup;
}

export function createBuffSummary(
  element: WeaponElementalType,
  buffAbilities: BuffAbilities,
  baseAttackBuffs: BaseAttackBuff[],
  attackPercentBuffs: AttackPercentBuff[],
  elementalDamageBuffs: ElementalDamageBuff[],
  finalDamageBuffs: FinalDamageBuff[],
  critRateBuffs: CritRateBuff[],
  critDamageBuffs: CritDamageBuff[],
): BuffSummary {
  return {
    element,
    baseAttackBuffs: createElementalBuffSummaryItemGroup(
      baseAttackBuffs,
      baseAttackBuffAggregator,
      element,
      buffAbilities,
    ),
    attackPercentBuffs: createElementalBuffSummaryItemGroup(
      attackPercentBuffs,
      attackPercentBuffAggregator,
      element,
      buffAbilities,
    ),
    elementalDamageBuffs: createElementalBuffSummaryItemGroup(
      elementalDamageBuffs,
      elementalDamageBuffAggregator,
      element,
      buffAbilities,
    ),
    finalDamageBuffs: createBuffSummaryItemGroup(
      finalDamageBuffs,
      finalDamageBuffAggregator,
      buffAbilities,
    ),
    critRateBuffs: createBuffSummaryItemGroup(
      critRateBuffs,
      critRateBuffAggregator,
      buffAbilities,
    ),
    critDamageBuffs: createBuffSummaryItemGroup(
      critDamageBuffs,
      critDamageBuffAggregator,
      buffAbilities,
    ),
  };
}

function createBuffSummaryItemGroup<T extends Buff = Buff>(
  buffs: T[],
  buffAggregator: BuffAggregator<T>,
  buffAbilities: BuffAbilities,
) {
  // Group same buffs together
  const buffsById = groupBy(buffs, (buff) => buff.id);

  const items: BuffSummaryItem[] = keysOf(buffsById).map((id) => {
    const sameBuffs = buffsById[id];
    const totalValue = buffAggregator(sameBuffs).totalValue;

    return {
      ...createSummaryItemCommonFields(sameBuffs, buffAbilities),
      totalValue,
    };
  });

  const totalValue = buffAggregator(buffs).totalValue;

  return {
    items,
    totalValue,
  };
}

function createElementalBuffSummaryItemGroup<
  T extends ElementalBuff = ElementalBuff,
>(
  buffs: T[],
  buffAggregator: ElementalBuffAggregator<T>,
  element: WeaponElementalType,
  buffAbilities: BuffAbilities,
) {
  // Group same buffs together
  const buffsById = groupBy(buffs, (buff) => buff.id);

  const items: BuffSummaryItem[] = keysOf(buffsById).map((id) => {
    const sameBuffs = buffsById[id];
    const totalValue = buffAggregator(sameBuffs).totalValueByElement[element];

    return {
      ...createSummaryItemCommonFields(sameBuffs, buffAbilities),
      totalValue,
    };
  });

  const totalValue = buffAggregator(buffs).totalValueByElement[element];

  return {
    items,
    totalValue,
  };
}

function createSummaryItemCommonFields(
  buffsWithSameId: Buff[],
  buffAbilities: BuffAbilities,
) {
  if (!buffsWithSameId.length) throw new Error("Array cannot be empty");

  const id = buffsWithSameId[0].id;
  const buffAbility = buffAbilities.find(id);

  return {
    id,
    displayName: buffAbility?.displayName ?? id, // This shouldn't happen, but just in case the buff ability isn't found
    description: buffAbility?.description,
    stacks: buffsWithSameId.length,
  };
}
